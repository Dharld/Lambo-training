/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import { useToast } from "../../../../hooks/toast.hook";

export default function PricingTab({ data, onPrevious, onNext }) {
  const [formData, setFormData] = useState({
    price: data.price,
  });
  const { showError } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const { price } = formData;
    if (!price) {
      showError("Please Enter the price in $");
      return;
    }
    onNext(formData);
  };

  const handlePrevious = () => {
    onPrevious();
  };
  return (
    <div className="max-w-[400px] mx-auto mt-6">
      <Input
        type="number"
        name="price"
        label="Price"
        placeholder="Enter the price"
        styles={"mt-12"}
        handleChange={handleChange}
      />
      <div className="flex gap-1 mt-4">
        <Button
          styles="bg-white border border-sky-500 text-sky-500 hover:text-white"
          handleClick={handlePrevious}
        >
          Previous
        </Button>
        <Button handleClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
