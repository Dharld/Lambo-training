import Button from "../../../../../components/Button/Button";
import Modal from "../../../../../components/Modal/Modal";
import Spinner from "../../../../../components/Spinner/Spinner";
import Section from "./Section";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Input from "../../../../../components/Input/Input";
import { useToast } from "../../../../../hooks/toast.hook";
import { useContent } from "../../ContentProvider";

export default function Content() {
  // State used by the isNewSectionModal
  const [sections, setSections] = useState([]);
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);

  // Component state
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { showError, showSuccess } = useToast();

  const { addSection: addSectionHelper, getAllSections } = useContent();

  useEffect(() => {
    setLoading(true);
    getAllSections()
      .then((res) => {
        const sections = res;
        setSections(sections);
        setLoading(false);
      })
      .catch((err) => {
        showError(err.message);
      });
  }, []);

  const openNewSectionModal = () => {
    setIsNewSectionModalOpen(true);
  };

  const closeNewSectionModal = () => {
    setIsNewSectionModalOpen(false);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const addSection = async () => {
    setLoading(true);
    await addSectionHelper(title);
    getAllSections()
      .then((res) => {
        const sections = res;
        setSections(sections);
        setLoading(false);
        closeNewSectionModal();
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const onErrorUpload = () => {
    showError("The upload failed");
  };

  const onUpdateSection = () => {
    showSuccess("Section updated successfully");
    setLoading(true);
    getAllSections()
      .then((res) => {
        const sections = res;
        setSections(sections);
        setLoading(false);
      })
      .catch((err) => {
        showError(err.message);
      });
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
              handleClick={() => addSection(title)}
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
            items={s.items}
            onUpdateSection={onUpdateSection}
            onErrorUpload={onErrorUpload}
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
