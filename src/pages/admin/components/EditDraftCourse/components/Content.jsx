import Button from "../../../../../components/Button/Button";
import Modal from "../../../../../components/Modal/Modal";
import Spinner from "../../../../../components/Spinner/Spinner";
import Section from "./Section";
import courseService from "../../../../../services/courseService";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "../../../../../components/Input/Input";
import { useToast } from "../../../../../hooks/toast.hook";
import { useSelector } from "react-redux";

const initialSections = [];

export default function Content() {
  // State used by the isNewSectionModal
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);
  const draft = useSelector((state) => state.course.draft);

  // Component state
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(initialSections);

  const { showError, showSuccess } = useToast();

  useEffect(() => {
    setLoading(true);
    courseService
      .getAllSection(draft.draft_id)
      .then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        setSections(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openNewSectionModal = () => {
    setIsNewSectionModalOpen(true);
  };

  const closeNewSectionModal = () => {
    setIsNewSectionModalOpen(false);
  };

  const addSection = async () => {
    if (!title) {
      showError("Please enter a title");
      return;
    }
    setLoading(true);
    courseService
      .createSection(draft.draft_id, title)
      .then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        setSections([
          ...sections,
          {
            id: res.data.id,
            order: res.data.order,
            title: res.data.title,
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
        setTitle("");
        setIsNewSectionModalOpen(false);
      });
  };

  const addLectureToSession = (id, newLectureTitle, base64String, onClose) => {
    if (newLectureTitle === "") {
      showError("Please enter a title");
      return;
    }
    setLoading(true);
    courseService
      .addLectureToSection(id, newLectureTitle, base64String)
      .then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }

        const updatedSections = sections.map((section) => {
          if (section.id === id) {
            // Create a new object for the section with an updated lectures array
            return {
              ...section,
              lectures: [
                ...section.lectures,
                {
                  id: res.data.id,
                  order: res.data.order,
                  title: res.data.title,
                  video_url: res.data.video_url,
                  section_id: res.data.section_id,
                },
              ],
            };
          }
          return section;
        });

        setSections(updatedSections);
        showSuccess("Lecture uploaded successfully ");
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  if (loading) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="shadow p-8 text-sm w-full">
      <Modal isOpen={isNewSectionModalOpen} onClose={closeNewSectionModal}>
        <div className="w-[400px] py-4 bg-white rounded-md flex flex-col  px-8 justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">
            New Section
          </h2>
          <Input
            type="text"
            placeholder="Enter the section title"
            className="w-full p-2 rounded-md"
            label="Title"
            value={title}
            handleChange={handleChangeTitle}
          />
          <div className="flex mt-6 gap-1">
            <Button handleClick={closeNewSectionModal}>Cancel</Button>
            <Button
              styles="bg-transparent border border-violet-500 text-violet-400 hover:bg-violet-400 hover:text-white"
              isDisabled={loading}
              loading={loading}
              handleClick={addSection}
            >
              Create Section
            </Button>
          </div>
        </div>
      </Modal>
      <h1 className="font-bold text-2xl">Curriculum</h1>
      <p className="mt-2">
        Start putting together your course by creating sections, lectures and
        practice(quizzes, coding exercises and assigments).
      </p>
      {sections.length > 0 &&
        sections.map((s) => (
          <Section
            key={s.id}
            id={s.id}
            order={s.order}
            title={s.title}
            lectures={s.lectures}
            loading={loading}
            addLectureToSession={addLectureToSession}
          />
        ))}
      <Button fit={true} styles="mt-4" handleClick={openNewSectionModal}>
        <span className="flex items-center gap-2">
          <AiOutlinePlus />
          Section
        </span>
      </Button>
    </div>
  );
}
