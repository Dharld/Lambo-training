/* eslint-disable react/prop-types */
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { COURSE_ICONS } from "../../../../../utils/utilsComponents";
import { useState } from "react";
import Overlay from "../../../../../components/Overlay/Overlay";

export default function CourseMenu({ course, handleItemClick }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const closeMenu = () => {
    setShow(false);
  };

  const openMenu = () => {
    setShow(true);
  };

  return (
    <>
      {!show && (
        <div
          className="fixed bg-white hover:bg-gray-100 hover:w-14 border top-[105px] left-0 w-12 h-8 p-2 z-[1100] rounded-tr-full rounded-br-full transition  grid place-items-center  justify-center cursor-pointer hidden-960md:flex"
          onClick={openMenu}
        >
          <AiOutlineRight className="text-gray-600" />
        </div>
      )}
      <div
        className={`relative border-r bg-white max-w-[300px] h-full flex flex-col transition z-[1100] -960md:fixed ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="px-8 py-4 gap-2 flex items-center border-b border-b-gray-100 hover:text-violet-500 hover:font-semibold cursor-pointer"
          onClick={goBack}
        >
          <AiOutlineLeft />
          <span>Back To Course Home</span>
        </div>

        {show && (
          <div
            className="bg-gray-100 border top-10 -right-4 transition-colors w-8 h-8 grid place-items-center p-2 absolute justify-center rounded-full cursor-pointer z-50 hidden-960md:flex"
            onClick={closeMenu}
          >
            <AiOutlineLeft className="text-gray-600" />
          </div>
        )}
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
      <Overlay isVisible={show} onClose={closeMenu} />
    </>
  );
}
