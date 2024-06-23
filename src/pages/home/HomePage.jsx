/* eslint-disable react/prop-types */
// src/components/Homepage.js
import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "./HomePage.scss";
import Rating from "../../components/Rating/Rating";
import Button from "../../components/Button/Button";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../../store/slices/cart/cart.slice";
import courseService from "../../services/courseService";
import { useToast } from "../../hooks/toast.hook";
import Spinner from "../../components/Spinner/Spinner";

import bannerImg from "../../assets/images/banner.png";

const COURSES = [
  {
    id: 1,
    title: "Complete Webdesign Course From Figma Freelancing",
    author: "Takou Tene",
    price: 250,
    rating: 4.25,
  },
  {
    id: 2,
    title: "Course 1",
    author: "Author 1",
    price: 100,
    rating: 4.5,
  },
  {
    id: 3,
    title: "Course 2",
    author: "Author 2",
    price: 150,
    rating: 4.2,
  },
  {
    id: 4,
    title: "Course 3",
    author: "Author 3",
    price: 200,
    rating: 4.7,
  },
  {
    id: 5,
    title: "Course 4",
    author: "Author 4",
    price: 120,
    rating: 4.3,
  },
  {
    id: 6,
    title: "Course 5",
    author: "Author 5",
    price: 180,
    rating: 4.6,
  },
  {
    id: 7,
    title: "Course 6",
    author: "Author 6",
    price: 90,
    rating: 4.1,
  },
  {
    id: 8,
    title: "Course 7",
    author: "Author 7",
    price: 160,
    rating: 4.4,
  },
  {
    id: 9,
    title: "Course 8",
    author: "Author 8",
    price: 140,
    rating: 4.8,
  },
  {
    id: 10,
    title: "Course 9",
    author: "Author 9",
    price: 110,
    rating: 4.0,
  },
  {
    id: 11,
    title: "Course 10",
    author: "Author 10",
    price: 130,
    rating: 4.9,
  },
];

const CoursePreview = ({ p, handleClick }) => {
  const navigate = useNavigate();

  const goToCourseDetails = (e) => {
    if (!e.target.closest("button")) {
      navigate(`course/${p.course_id}`);
    }
  };

  return (
    <div
      className="cursor-pointer p-2 transition-shadow h-full relative flex flex-col"
      onClick={goToCourseDetails}
    >
      <div className="aspect-[16/9] bg-gray-100">
        <img
          src={decodeURIComponent(p.thumbnail_url)}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="text-zinc-900 font-bold text-xl leading-6 mt-2">
        {p.title.length > 40 ? p.title.slice(0, 40) + "..." : p.title}
      </div>
      <div className="text-base text-gray-500">{p.author}</div>
      <Rating rating={4.7} />
      <div className="text-base text-gray-900 mt-1 font-extrabold">
        ${p.price}
      </div>
      <div className="flex-1"></div>
      <Button
        styles="mt-6 bg-transparent text-violet-500 border border-violet-500 hover:text-white"
        handleClick={handleClick}
      >
        Add To Cart
      </Button>
    </div>
  );
};

const Homepage = () => {
  const categoriesRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      courseService.getCategories().then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        setCategories(res.data);
      });
    };
    const fetchCoursesPreview = async () => {
      courseService.getAllCoursesPreview().then((res) => {
        if (!res.success) {
          showError(res.error);
          return;
        }
        console.log(res.data);
        setProducts(res.data);
      });
    };
    setLoading(true);
    Promise.all([fetchCategories(), fetchCoursesPreview()]).finally(() => {
      setLoading(false);
    });
  }, [showError, showSuccess]);

  const scrollToLeft = () => {
    const categoriesDiv = categoriesRef.current;
    categoriesDiv.scrollBy(-categoriesDiv.clientWidth, 0);
  };

  const scrollToRight = () => {
    const categoriesDiv = categoriesRef.current;
    categoriesDiv.scrollBy(categoriesDiv.clientWidth, 0);
  };

  const addToCart = (product) => {
    dispatch(addToCartAction(product));
  };

  const Category = ({ name }) => {
    return (
      <div className="select-none w-fit h-fit flex-shrink-0 px-4 py-2 border text-slate-800 rounded-sm items-center text-center scroll-smooth cursor-pointer hover:bg-violet-500 hover:text-white transition-colors">
        {name}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 bg-white z-[10000] grid place-items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen pb-8">
      <div className="h-[50vh] banner-bg">
        <img src={bannerImg} alt="" className="w-full h-full object-none" />
      </div>
      <div className="w-[1300px] mx-auto relative">
        <div className="py-8">
          <div className="flex justify-between items-baseline">
            <h2 className="text-slate-600 font-bold text-xl mb-4">
              Our Top Categories
            </h2>
            <div className="flex gap-1">
              <div
                className="w-[34px] h-[34px] bg-violet-100 text-violet-500 cursor-pointer hover:bg-violet-500 hover:text-white rounded-full grid place-items-center top-[2px] transition-colors"
                onClick={scrollToLeft}
              >
                <AiOutlineArrowLeft />
              </div>
              <div
                className="w-[34px] h-[34px] bg-violet-100 text-violet-500 cursor-pointer hover:bg-violet-500 hover:text-white  rounded-full grid place-items-center top-[2px] transition-colors"
                onClick={scrollToRight}
              >
                <AiOutlineArrowRight />
              </div>
            </div>
          </div>
          <div
            className="flex flex-nowrap gap-1 w-full overflow-hidden sections "
            ref={categoriesRef}
          >
            <Category name="All Category" />
            {categories.map((c) => (
              <Category key={c.id} name={c.name} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {products.length > 0
            ? products.map((p) => (
                <CoursePreview
                  key={p.course_id}
                  p={p}
                  handleClick={(e) => {
                    e.preventDefault();
                    addToCart(p);
                  }}
                />
              ))
            : "No Products"}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
