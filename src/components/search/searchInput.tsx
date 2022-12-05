import Select from "react-select";
import { useFormInput } from "../../store/searchFormInput";
import { useRouter } from "next/router";
import {
  cities,
  governorates,
  type MygovernorateType,
} from "../../utils/cities";
import { useState } from "react";
import { useLanguage } from "../../store/store";
import type { State } from "../../types/typeshelper";

const SearchInput: React.FC = () => {
  const style = {
    control: () => ({
      display: "flex",
      border: "0",
      // This line disable the blue border
      boxShadow: "0",
      "&:hover": {
        border: "0",
      },
    }),
    background: "#023950",
  };

  const [selectedGovernorate, setselectedGovernorate] = useState<State>({
    label: "",
    value: "",
    position: [0, 0],
  });
  const [selectedMunicipality, setselectedMunicipality] = useState<State>({
    label: "",
    value: "",
    position: [0, 0],
  });
  const munoptions = cities[selectedGovernorate.label];

  const [selectedMunError] = useState("");

  const filter = useFormInput();

  const Language = useLanguage();

  const router = useRouter();

  const hundelgovchange = (e: MygovernorateType) => {
    setselectedGovernorate({
      label: e.label,
      value: e.value as string,
      position: e.position as [number, number],
    });
    setselectedMunicipality({ label: "", value: "", position: [0, 0] });
    filter.setgovernorate(e.label);
    filter.setmunicipality("");
  };

  const hundelmunchange = (e: MygovernorateType) => {
    setselectedMunicipality({
      label: e.label,
      value: e.value as string,
      position: e.position as [number, number],
    });
    filter.setmunicipality(e.label);
  };

  const hundelclicksearch = () => {
    router.push("/search");
  };

  return (
    <div>
      <div
        className={`mx-auto  mt-4 flex min-h-[40px] flex-col gap-4  rounded-2xl border-4 border-devider bg-devider px-4  pt-6  pb-3 xs:flex-row xs:pt-0  xs:pb-0 md:max-w-full ${
          selectedMunError ? "border-red" : "border-devider"
        }`}
      >
        <div className="relative flex flex-grow bg-red xs:w-1/2">
          <h1
            className={`absolute left-0 z-10 py-0  text-lg font-semibold ${
              !!selectedGovernorate.label
                ? "top-[-18px] bg-white"
                : "top-0 bg-devider"
            }	transition-all duration-500 `}
          >
            {Language.lng == "ENG" ? "Governorate" : "Gouvernorat"}
          </h1>
            <label htmlFor="governorate"></label>
          <Select
            styles={style}
            value={selectedGovernorate}
            id="governorate"
            instanceId="governorate"
            options={governorates}
            onChange={(e) => {
              hundelgovchange(e as MygovernorateType);
            }}
            placeholder=""
            className="mr-auto   w-full bg-devider"
          />
        </div>

        <div className="relative flex flex-grow xs:w-1/2">
          <h1
            className={`absolute left-0 z-10 py-0  text-lg font-semibold ${
              !!selectedMunicipality.label
                ? "top-[-18px] bg-white"
                : "top-0 bg-devider"
            }	transition-all duration-500 `}
          >
            {Language.lng == "ENG" ? "Municipality" : "Municipalité"}
          </h1>
          <label htmlFor="Municipality"></label>
          <Select
            styles={style}
            id="Municipality"
            instanceId="Municipality"
            value={selectedMunicipality as MygovernorateType}
            options={munoptions}
            onChange={(e) => {
              hundelmunchange(e as MygovernorateType);
            }}
            placeholder=" Municipality"
            className=" mr-auto   w-full bg-devider "
          />
        </div>

        <button
          id="search"
          onClick={hundelclicksearch}
          className="my-auto mx-auto mt-auto flex items-center rounded-full border-2 text-red  hover:scale-105 active:scale-95 xs:border-none "
        >
          <p className="px-2 text-lg xs:hidden  ">Search</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-full w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
