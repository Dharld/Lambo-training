import Input from "../../../../../components/Input/Input";
import TextArea from "../../../../../components/TextArea/TextArea";
import uploadImg from "../../../../../assets/images/upload.png";
import Button from "../../../../../components/Button/Button";

export default function Landing() {
  return (
    <div className="shadow p-8 text-sm">
      <h1 className="font-bold text-2xl">Course landing page</h1>
      <div className="mt-4">
        Your course landing page is crucial for your success. If it's well done,
        it not only captivates your audience but also converts browsers into
        active users. This is your first opportunity to make a strong
        impression—ensure it communicates the core values and benefits of your
        courses clearly and effectively.
      </div>
      <Input
        label="Course title"
        styles="mt-12"
        placeholder="Enter the course title"
      />
      <TextArea
        label="Course description"
        styles="mt-12"
        placeholder="Write a small description of the course"
      />
      <div className="thumbnail">
        <div className="font-medium text-xl my-4 text-slate-500">
          Thumbnail image
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 rounded-md overflow-hidden">
            <img src={uploadImg} alt="" className="flex-1" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div>
              Upload your course Image here. It must follow the following
              guidelines: 750x442 pixels; .jpg, .jpeg or .png. No text on the
              image
            </div>
            <div className="w-full mt-4">
              <input
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png"
              />
              <div className="flex items-center pl-4 bg-slate-100">
                <div className="flex-1">No File Selected</div>
                <Button fit={true}>Upload File</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video">
        <div className="font-medium text-xl my-4 text-slate-500">
          Promo video
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 rounded-md overflow-hidden">
            <img src={uploadImg} alt="" className="flex-1" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div>
              Upload your course Image here. It must follow the following
              guidelines: 750x442 pixels; .jpg, .jpeg or .png. No text on the
              image
            </div>
            <div className="w-full mt-4">
              <input
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png"
              />
              <div className="flex items-center pl-4 bg-slate-100">
                <div className="flex-1">No File Selected</div>
                <Button fit={true}>Upload File</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
