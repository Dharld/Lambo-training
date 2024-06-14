import { useCourses } from "../../../../hooks/courses.hook";
import { useModal } from "../../../../hooks/modal.hook";
import Modal from "../../../../components/Modal/Modal";
import Spinner from "../../../../components/Spinner/Spinner";
import Chip from "../../../../components/Chip/Chip";
import Button from "../../../../components/Button/Button";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useEffect, useState } from "react";
import { useToast } from "../../../../hooks/toast.hook";

export default function Courses() {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { showError, showSuccess } = useToast();
  const { allCourses, getAllCourses, loadingCourses, deleteCourse, error } =
    useCourses();
  const { openModal, isOpen, closeModal, modalContent } = useModal();

  useEffect(() => {
    getAllCourses();
  }, []);

  if (loadingCourses) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load courses. Please try again later.
      </div>
    );
  }

  if (allCourses.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            No courses available
          </h2>
          <p className="text-gray-500">Check back later for more courses.</p>
        </div>
      </div>
    );
  }

  const publicUrl = import.meta.env.VITE_SUPABASE_IMAGE;

  const openDeleteModal = (course) => {
    console.log(course);
    openModal({
      type: "delete",
      payload: { course },
    });
  };

  const deleteCourseAction = () => {
    setLoadingDelete(true);
    const {
      payload: { course },
    } = modalContent;
    deleteCourse(course)
      .then((res) => {
        if (res.error) {
          console.error(res.error);
          showError("Unable to delete the course");
          return;
        }
        showSuccess("Course deleted successfully");
        closeModal();
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  return (
    <div className="container mx-auto p-4 px-8">
      <h1 className="text-3xl font-bold text-gray-600 mb-4">Courses</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-auto">
        {allCourses.map((course) => (
          <div
            key={course.course_id}
            className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-2"
          >
            <img
              src={publicUrl + course.thumbnail_url}
              alt={course.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-regular font-bold text-sky-700 truncate leading-3">
                {course.title}
              </h3>
              <p className="text-sm text-gray-700 mt-1">{course.description}</p>
              <div>
                <p className="text-xs text-gray-500">
                  Instructor: {course.instructor_name}
                </p>
                <div className="flex justify-between items-baseline mt-4">
                  <div className="font-bold text-gray-900 text-xl">
                    ${course.price}
                  </div>
                  <Chip text={course.level} />
                </div>
                <Button
                  styles="mt-6"
                  isDisabled={loadingDelete}
                  loading={loadingDelete}
                  handleClick={() => {
                    openDeleteModal(course);
                  }}
                >
                  Delete Course
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <DeleteModal
          title="Do you really want to delete this course. This action will be not reversible"
          handleDelete={deleteCourseAction}
          handleCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
