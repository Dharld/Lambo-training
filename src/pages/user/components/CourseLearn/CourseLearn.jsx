/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { AiOutlineCheck } from "react-icons/ai";
import "./CourseLearn.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../../../components/Spinner/Spinner";
import { useCourses } from "../../../../hooks/courses.hook";
import { useToast } from "../../../../hooks/toast.hook";
import Button from "../../../../components/Button/Button";
import { pdfType, quizzType, videoType } from "../../../../utils/constants";
import ReactPlayer from "react-player";
import supabase from "../../../../utils/connectSupabase";
import Quizz from "./components/Quizz";
import { useSelector } from "react-redux";
import CourseMenu from "./components/CourseMenu";

const MarkAsCompletedButton = ({
  toggleItemCompleted,
  loading,
  currentItem,
}) => {
  return (
    <Button
      fit={true}
      handleClick={toggleItemCompleted}
      loading={loading}
      isDisabled={loading}
      styles={`mt-4 ${
        currentItem.is_completed
          ? "bg-transparent hover:bg-green-100 text-green-400 border border-green-400"
          : ""
      }`}
    >
      {currentItem.is_completed && (
        <div className="flex items-center gap-1">
          <AiOutlineCheck /> <span>Completed</span>
        </div>
      )}
      {!currentItem.is_completed && (
        <div className="flex items-center gap-1">
          <span>Mark As Completed</span>
        </div>
      )}
    </Button>
  );
};

export default function CourseLearn() {
  const params = useParams();
  const courseId = params.courseId;
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [course, setCourse] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const { showError, showSuccess } = useToast();

  const user = useSelector((state) => state.auth.user);

  const { getCourseDetails } = useCourses();

  useEffect(() => {
    setLoading(true);

    async function getLastUpdatedSectionId(courseId) {
      try {
        const { error, data } = await supabase
          .from("Section")
          .select("id, last_updated")
          .eq("course_id", courseId)
          .order("last_updated", {
            ascending: false,
          })
          .limit(1);

        if (error) {
          showError(error.message);
          return;
        }

        const lastUpdatedSectionId = data[0].id;
        return lastUpdatedSectionId;
      } catch (err) {
        console.error("Error getting last updated section id", err);
        showError(err.message);
      }
    }

    async function getLastUpdatedSectionItem(sectionId) {
      try {
        const { error, data } = await supabase
          .from("SectionItem")
          .select(
            "content_type, item_id, title, details, last_updated, UserProgress(is_completed)"
          )
          .eq("section_id", sectionId)
          .order("last_updated", {
            ascending: false,
          })
          .limit(1);

        if (error) {
          showError(error.message);
          return;
        }

        return data[0];
      } catch (err) {
        console.error("Error getting last updated section item", err);
        showError(err.message);
      }
    }

    getCourseDetails(courseId, user.id)
      .then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        const course = res.data;
        const courseId = course.course_id;
        setCourse(course);
        getLastUpdatedSectionId(courseId)
          .then(getLastUpdatedSectionItem)
          .then((item) => {
            setCurrentItem({
              ...item,
              is_completed: !item.UserProgress[0].is_completed,
            });
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleItemClick = (item) => {
    supabase
      .from("SectionItem")
      .update({ last_updated: new Date() })
      .eq("item_id", item.item_id)
      .then(() => {
        setCurrentItem(item);
      });
  };

  const updateCourseProgress = async () => {
    await getCourseDetails(courseId, user.id).then((res) => {
      if (!res.success) {
        showError(res.error);
        return;
      }
      const updatedCurrentItem = {
        ...currentItem,
        is_completed: !currentItem.is_completed,
      };
      setCurrentItem(updatedCurrentItem);
      setCourse(res.data);
    });
  };

  const toggleItemCompleted = async () => {
    if (currentItem) {
      const userId = user.id;
      const itemId = currentItem.item_id;
      setLoadingUpload(true);

      if (courseId) {
        /** Check Record existence */
        const { data } = await supabase
          .from("UserProgress")
          .select("*")
          .eq("item_id", itemId)
          .eq("user_id", userId);

        /** Logic of completion */
        if (data.length == 0) {
          await supabase
            .from("UserProgress")
            .insert({
              course_id: courseId,
              user_id: userId,
              item_id: itemId,
              is_completed: true,
            })
            .eq("item_id", itemId)
            .eq("user_id", userId);
        } else {
          await supabase
            .from("UserProgress")
            .update({
              course_id: courseId,
              user_id: userId,
              item_id: itemId,
              is_completed: !data[0].is_completed,
            })
            .eq("item_id", itemId)
            .eq("user_id", userId);
        }
      }

      await updateCourseProgress();
      showSuccess("Successfully updated");
      setLoadingUpload(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="fixed flex top-[64px] left-0 bg-white w-full h-screen">
      <CourseMenu course={course} handleItemClick={handleItemClick} />
      <div className="flex-1 px-12 bg-gray-50/10">
        <div className="mt-12 max-w-[1000px] mx-auto">
          {currentItem &&
            currentItem.content_type === videoType &&
            currentItem.details && (
              <div className="fade-in">
                <h2 className="text-2xl my-4 font-bold">{currentItem.title}</h2>
                <div className="rounded-lg overflow-hidden shadow-md bg-slate-800">
                  <ReactPlayer
                    url={currentItem.details.video_url}
                    controls
                    width="100%"
                    height={`${(window.innerHeight - 64) * 0.65}px`}
                    style={{
                      borderRadius: "5px", // This can be removed since we're using Tailwind's rounded-lg
                      overflow: "hidden", // This is handled by the wrapper now
                    }}
                  />
                </div>

                <MarkAsCompletedButton
                  toggleItemCompleted={toggleItemCompleted}
                  loading={loadingUpload}
                  currentItem={currentItem}
                />
              </div>
            )}
          {currentItem &&
            currentItem.content_type === pdfType &&
            currentItem.details && (
              <div className="fade-in">
                <h2 className="text-2xl my-4 font-bold">{currentItem.title}</h2>
                <div className="rounded-lg overflow-hidden shadow-md bg-slate-800">
                  <iframe
                    src={currentItem.details.pdf_url}
                    width="100%"
                    height={`${(window.innerHeight - 64) * 0.65}px`}
                  />
                </div>
                <MarkAsCompletedButton
                  toggleItemCompleted={toggleItemCompleted}
                  loading={loadingUpload}
                  currentItem={currentItem}
                />
              </div>
            )}
          {currentItem &&
            currentItem.content_type === quizzType &&
            currentItem.details && (
              <Quizz
                item={currentItem}
                updateCourseProgress={updateCourseProgress}
              />
            )}
        </div>
      </div>
    </div>
  );
}
