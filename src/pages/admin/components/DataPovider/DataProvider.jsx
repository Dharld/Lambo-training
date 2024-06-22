/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../../../hooks/toast.hook";
import { addAudienceDetails } from "../../../../store/slices/course/course.actions";

// Custom hook for handling list-based states
const useListState = (initialItems, minCount = 0, emptyText = "") => {
  // Initial items is mapped to a form acceptable for our components
  const [items, setItems] = useState(() =>
    initialItems.map((item) => ({ id: item.id, text: item.text || emptyText }))
  );

  // Each draft change triggers a rerender
  useEffect(() => {
    const updatedItems = initialItems.map((item) => ({
      id: item.id,
      text: item.text || emptyText,
    }));

    // Before triggering a rerender, we should check if the items have changed
    const itemsChanged =
      updatedItems.length !== items.length ||
      updatedItems.some(
        (newItem, index) =>
          newItem.id !== items[index]?.id || newItem.text !== items[index]?.text
      );

    if (itemsChanged) {
      setItems(updatedItems);
    }
  }, [initialItems, emptyText]);

  const handleItemChange = useCallback((index, event) => {
    const value = event.target.value;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === index ? { ...item, text: value } : item
      )
    );
  }, []);

  const addItem = useCallback(() => {
    const lastItem = items.at(-1);
    const lastId = lastItem ? lastItem.id + 1 : 0;
    setItems((prevItems) => [...prevItems, { id: lastId, text: emptyText }]);
  }, [emptyText, items]);

  const removeItem = useCallback((index) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== index));
  }, []);

  const validateItems = useCallback(() => {
    const filteredItems = items.filter((item) => item.text.trim() !== "");
    return filteredItems.length >= minCount ? filteredItems : null;
  }, [items, minCount]);

  return { items, handleItemChange, addItem, validateItems, removeItem };
};

const DataContext = createContext(null);

// Constants for initial states
const INITIAL_STATE = { id: 0, text: "" };

export const DataProvider = ({ children }) => {
  const draft = useSelector((state) => state.course.draft);

  const dispatch = useDispatch();
  const { showError } = useToast();

  const {
    items: objectives,
    handleItemChange: handleObjectiveChange,
    addItem: addObjective,
    validateItems: validateObjectives,
    removeItem: removeObjective,
  } = useListState(
    draft?.objectives || [INITIAL_STATE],
    4,
    "Learning Objective"
  );

  const {
    items: requirements,
    handleItemChange: handleRequirementChange,
    addItem: addRequirement,
    validateItems: validateRequirements,
    removeItem: removeRequirement,
  } = useListState(draft?.requirements || [INITIAL_STATE], 1, "Requirements");

  const {
    items: targets,
    handleItemChange: handleTargetChange,
    addItem: addTarget,
    validateItems: validateTargets,
    removeItem: removeTarget,
  } = useListState(draft?.targets || [INITIAL_STATE], 1, "Target");

  const handleSaveAudience = useCallback(async () => {
    const validatedObjectives = validateObjectives();
    const validatedTargets = validateTargets();
    const validatedRequirements = validateRequirements();

    if (!validatedObjectives) {
      showError("You should have at least 4 learning objectives");
      return;
    }
    if (!validatedTargets) {
      showError("You should have at least 1 target");
      return;
    }

    if (!validatedRequirements) {
      showError("You should have at least 1 requirement");
      return;
    }

    return dispatch(
      addAudienceDetails({
        draft_id: draft.draft_id,
        objectives: validatedObjectives,
        requirements: validatedRequirements,
        targets: validatedTargets,
      })
    );
  }, [
    validateObjectives,
    validateRequirements,
    validateTargets,
    dispatch,
    showError,
  ]);

  return (
    <DataContext.Provider
      value={{
        /** For Audience Tab */
        objectives,
        handleObjectiveChange,
        addObjective,
        removeObjective,
        requirements,
        handleRequirementChange,
        addRequirement,
        removeRequirement,
        targets,
        handleTargetChange,
        addTarget,
        removeTarget,
        handleSaveAudience,
        /** For Landing Tab*/
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
