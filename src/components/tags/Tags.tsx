import React, { useEffect, useState } from "react";
import { apiGetProducts, apiGetTags } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTag } from "../../redux/features/productsSlice";

interface Tag {
  name: string;
  // Add other properties if present in the tag object
}
const Tags = () => {
  const [dataTags, setDataTags] = useState<Tag[]>([]);
  const dispatch = useDispatch();
  const {
    data: products,
    selectedCategory,
    selectedTag,
    search,
  } = useSelector((state) => state.products);

  useEffect(() => {
    getProducts(selectedCategory, selectedTag, search);
  }, [search, selectedCategory, selectedTag]);
  console.log(search, "sss");
  const getProducts = async (category: string, tag: string, q: string) => {
    try {
      const {
        data: { status, record },
      } = await apiGetProducts(category, tag, q);
      if (status === 200) {
        dispatch(setData(record, "rec tag"));
        console.log(record);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    try {
      const {
        data: { status, record },
      } = await apiGetTags();
      if (status === 200) {
        setDataTags(record);
        console.log("tag", record);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (tag: string) => {
    if (tag !== selectedTag) {
      dispatch(setSelectedTag(tag));
    } else {
      dispatch(setSelectedTag(""));
    }
  };
  return (
    <div className="w-full h-auto flex flex-row">
      <div className="flex flex-row">
        {selectedCategory === "" && search === ""
          ? dataTags.map((item, i) => (
              <p
                key={i}
                className={`mr-4 px-4 rounded-lg border ${
                  selectedTag === item.name
                    ? "bg-orange-500 text-white"
                    : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                } cursor-pointer`}
                onClick={() => handleClick(item.name)}
              >
                {item?.name}
              </p>
            ))
          : Array.from(
              new Set(products.map((product) => product?.tags?.name))
            ).map((tag, index) => (
              <p
                key={index}
                className={`mr-4 px-4 rounded-lg border ${
                  selectedTag === tag
                    ? "bg-orange-500 text-white"
                    : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                } cursor-pointer`}
                onClick={() => handleClick(tag)}
              >
                {tag}
              </p>
            ))}
      </div>
    </div>
  );
};

export default Tags;
