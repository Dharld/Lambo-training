/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { AiOutlineArrowLeft, AiOutlineCheck } from "react-icons/ai";
import "./CourseLearn.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../../../components/Spinner/Spinner";
import { useCourses } from "../../../../hooks/courses.hook";
import { useToast } from "../../../../hooks/toast.hook";
import { COURSE_ICONS } from "../../../../utils/utilsComponents";
import Button from "../../../../components/Button/Button";
import { pdfType, quizzType, videoType } from "../../../../utils/constants";
import ReactPlayer from "react-player";
import supabase from "../../../../utils/connectSupabase";
import Quizz from "./components/Quizz";

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

  const { getCourseDetails } = useCourses();

  const navigate = useNavigate();

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
            "content_type, is_completed, item_id, title, details, last_updated"
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
    getCourseDetails(courseId)
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
            console.log(item);
            setCurrentItem(item);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleItemClick = (item) => {
    console.log(item);
    supabase
      .from("SectionItem")
      .update({ last_updated: new Date() })
      .eq("item_id", item.item_id)
      .then(() => {
        setCurrentItem(item);
      });
  };

  const goBack = () => {
    navigate(-1);
  };

  const toggleItemCompleted = async () => {
    if (currentItem) {
      const item_id = currentItem.item_id;
      setLoadingUpload(true);
      await supabase
        .from("SectionItem")
        .update({
          is_completed: !currentItem.is_completed,
        })
        .eq("item_id", item_id);
      await getCourseDetails(courseId).then((res) => {
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
      <div className="max-w-[375px] border-r h-full flex flex-col">
        <div
          className="px-8 py-4 gap-2 flex items-center border-b border-b-gray-100 hover:text-violet-500 hover:font-semibold cursor-pointer"
          onClick={goBack}
        >
          <AiOutlineArrowLeft />
          <span>Back To Course Home</span>
        </div>
        <div className="px-8 py-4">
          <div className="font-bold text-xl text-violet-500">
            Learn HTML, CSS, and JS from Scratch
          </div>
          <div className="mt-2">
            <div className="text-sm text-violet-500">
              {course && course.completion_percentage}% completed
            </div>
            <div className="mt-1">
              <div className="w-full h-[4px] rounded-full bg-gray-100 relative flex">
                <div
                  style={{
                    flexBasis: `${
                      course ? course.completion_percentage : "0"
                    }%`,
                  }}
                  className={`h-[4px] bg-green-400`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 px-8 pb-20 overflow-auto scroll-hide">
          {course &&
            course.sections &&
            course.sections.map((section) => (
              <div key={section.id} className="first:mt-0 mt-4">
                <h2 className="font-bold text-lg text-violet-400">
                  {section.title}
                </h2>
                <div className="mt-1">
                  {section.items &&
                    section.items
                      .sort((i1, i2) => i1.item_id - i2.item_id)
                      .map((item) => (
                        <div
                          key={item.item_id}
                          className="text-gray-700 first:mt-0 mt-2 flex items-center gap-2 item
                    "
                        >
                          <div
                            className={`w-4 h-4 border border-gray-500 rounded-full ${
                              item.is_completed
                                ? "bg-green-400 border-green-400"
                                : ""
                            } circle`}
                          />
                          <div
                            className="flex items-center gap-1 text-zinc-400 hover:text-violet-500 transition-colors"
                            onClick={() => {
                              handleItemClick(item);
                            }}
                          >
                            <span>{COURSE_ICONS[item.content_type]}</span>
                            <span className="cursor-pointer ">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            ))}
        </div>
      </div>
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
              <div className="">
                <Quizz item={currentItem} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
