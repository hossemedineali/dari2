import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { MygovernorateType } from "../../utils/cities";
import MapWithNoSSR from "../maps/mapWithNoSSR";
import Switch from "../ui/switch";
import Image from "next/image";
import { trpc } from "../../utils/trpc";
import { motion } from "framer-motion";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useLanguage } from "../../store/store";
import { Loader } from "../ui/loader";

type Location = {
  loaded: boolean;
  coordinates?: {
    lat: number | null;
    lng: number | null;
  };
  error?: {
    code?: number;
    message?: string;
  };
};

type LocationType = {
  coords: {
    accuracy: number;
    altitude: number | null; //|null
    altitudeAccuracy: number | null; //|null
    heading: number | null; //|null
    latitude: number;
    longitude: number;
    speed: number | null; // |null
  };
};

type FProps = {
  selectedMunicipality: MygovernorateType;
  selectedGovernorate: MygovernorateType;
};

const imgtype = z.array(z.string());
type Imgtype = z.infer<typeof imgtype>;

const form = z.object({
  landtype: z.string().default("Buildable land"),
  price: z.number({
    required_error: "required",
  }),
  size: z.number({
    required_error: "required",
  }),
  contact: z.string({ required_error: "required" }),
  description: z.string().optional(),
});

type Form = z.infer<typeof form>;

const LandFilters: React.FC<FProps> = ({
  selectedMunicipality,
  selectedGovernorate,
}) => {
  const router = useRouter();
  const Language = useLanguage();

  const addPost = trpc.addPost.add.useMutation();
  const { data: sesssion } = useSession();

  const [showMap, setshowMap] = useState(false);
  const [images, setImages] = useState([]);

  const [location, setLocation] = useState<Location>({
    loaded: false,
    coordinates: { lat: null, lng: null },
  });

  const [position, setposition] = useState<[number, number]>([0, 0]);

  const [imagedata, setimagedata] = useState<Imgtype>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(form),
  });

  const submit = async (data: Form) => {
    let isposition = false;
    if (position[0] != 0 || position[1] != 0) {
      isposition = true;
    }

    const postData = {
      ...data,

      governorate: selectedGovernorate.value as string,
      municipality: selectedMunicipality.value as string,
      announcementtype: "Sell",
      isposition,
      lng: position[0],
      lat: position[1],
      images: imagedata,
    };

    addPost.mutate({
      ...postData,
      auther: sesssion?.user?.id as string,
      propertyType: "land",
      rooms: 0,
    });
  };

  if (addPost.data) {
    setTimeout(() => {
      router.replace("/");
    }, 2500);
  }

  useEffect(() => {
    if (selectedMunicipality.label != "") {
      setposition(selectedMunicipality.position as [number, number]);
    }
  }, [selectedMunicipality.label, selectedMunicipality.position]);

  const hundelFileInput = (imageList: ImageListType) => {
    setimagedata([]);
    setImages(imageList as never[]);
    imageList.map((item) => {
      setimagedata((prev) => [...prev, item.dataURL as string]);
    });
  };

  const getDevicePosition = () => {
    const onSuccess = (location: LocationType) => {
      setposition([location.coords.latitude, location.coords.longitude]);
    };

    const onError = (err: any) => {
      setLocation({
        loaded: true,
        error: {
          code: err.code,
          message: err.message,
        },
      });
    };

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return (
    <form className="mb-12 w-full" onSubmit={handleSubmit(submit)}>
      <label>Type</label>

      <div className="flex w-full flex-col md:flex-row ">
        <div className=" md:mr-8">
          <input
            className="mr-2"
            onChange={(e) => {
              if (e.currentTarget.checked) {
                setValue("landtype", "Buildable land");
              }
            }}
            type="radio"
            name="pricePer"
            id="mounth"
            value="mounth"
          />

          <label>
            {Language.lng == "ENG" ? "Buildable land" : "Terrain constructible"}
          </label>
        </div>

        <div>
          <input
            className="mr-2"
            onChange={(e) => {
              if (e.currentTarget.checked) {
                setValue("landtype", "farmland");
              }
            }}
            type="radio"
            name="pricePer"
            id="day"
            value="day"
          />

          <label>
            {Language.lng == "ENG" ? "Farmland" : "terrain agricole"}{" "}
          </label>
        </div>
      </div>
      <div className="my-3 border border-devider  "></div>

      {/* --------Price and Land size */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h5
            className={`mb-1 font-medium ${
              errors.price?.message ? "text-red" : ""
            }`}
          >
            {Language.lng == "ENG" ? "Price" : "Prix"} :{" "}
            {errors.price?.message ? errors.price.message : ""}
          </h5>

          <label
            htmlFor="price"
            className={`text-gray-400 focus-within:text-gray-600 relative block   rounded border-2 ${
              errors.price?.message ? "border-red" : "border-devider"
            } `}
          >
            <p className=" pointer-events-none absolute top-1/2 right-2 h-6 w-8 -translate-y-1/2 transform">
              {" "}
              Tnd
            </p>

            <input
              name="price"
              type="number"
              id="price"
              step="0.01"
              placeholder="price"
              className="form-input h-[38px] w-full px-1"
              onChange={(e) =>
                setValue("price", parseFloat(e.currentTarget.value))
              }
            />
          </label>
        </div>

        <div className="w-full md:w-1/2">
          <h5
            className={`mb-1 font-medium ${
              errors.size?.message ? "text-red" : ""
            }`}
          >
            {Language.lng == "ENG" ? "Size" : "Surface"} m2 :{" "}
            {errors.size?.message ? errors.size?.message : ""}
          </h5>
          <label
            htmlFor="landsize"
            className={`text-gray-400 focus-within:text-gray-600 relative block   rounded border-2 ${
              errors.size?.message ? "border-red" : "border-devider"
            } `}
          >
            <input
              type="number"
              id="size"
              placeholder=" property size "
              className="h-[38px] w-full rounded-md px-1"
              onChange={(e) =>
                setValue("size", parseFloat(e.currentTarget.value))
              }
            />

            <p className=" pointer-events-none absolute top-1/2 right-4 h-6 w-8 -translate-y-1/2 transform">
              {" "}
              m2
            </p>
          </label>
        </div>
      </div>
      <div className="my-3 border border-devider  "></div>

      {/* ----------------Images---------------- */}

      <div className="flex flex-col">
        <ImageUploading
          multiple
          value={images}
          onChange={hundelFileInput}
          maxNumber={9}
          maxFileSize={9437184}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
            errors,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper mx-auto ">
              <div className="mx-auto flex flex-wrap gap-2">
                <span
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  className="w-max cursor-pointer rounded-lg border p-1 hover:scale-95 active:scale-105"
                >
                  {Language.lng == "ENG" ? "Add images" : "Ajoutre des images"}
                  (Max 9)
                </span>
                &nbsp;
                <span
                  onClick={onImageRemoveAll}
                  className="w-max cursor-pointer rounded-lg border p-1 hover:scale-95 active:scale-105"
                >
                  Remove all images
                </span>
              </div>
              <br />
              <span className="mt-4">
                {" "}
                {images.length}{" "}
                {Language.lng == "ENG" ? "images selected" : "Images"}{" "}
              </span>
              {errors && (
                <div className="font-bold text-red">
                  {errors.maxNumber && (
                    <span>
                      {Language.lng == "ENG"
                        ? "Maximum images number allowed is 9"
                        : "Nombre maximal autorisée est 9"}
                    </span>
                  )}
                  {errors.maxFileSize && (
                    <span>
                      {Language.lng == "ENG"
                        ? "Maximum image size must be less then 9mb"
                        : "Taille maximum d'un image ne peut pas passer 9mb"}
                    </span>
                  )}
                </div>
              )}
              <div className="mx-auto flex flex-wrap gap-2">
                {imageList.map((image, index) => (
                  <div key={index} className=" mx-auto border p-2">
                    <Image
                      src={image.dataURL as string}
                      alt=""
                      width="150"
                      height="120"
                      className="relative"
                    />

                    <div>
                      <span
                        onClick={() => onImageUpdate(index)}
                        className="absloute mr-2 w-max cursor-pointer rounded-lg border p-1 hover:bg-red"
                      >
                        {Language.lng == "ENG" ? "Update" : "Modifier"}
                      </span>
                      <span
                        onClick={() => onImageRemove(index)}
                        className="w-max cursor-pointer rounded-lg border p-1 hover:border-red "
                      >
                        {Language.lng == "ENG" ? "Remove" : "Retirer"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
      </div>

      <div className="my-3 border border-devider  "></div>

      {/* -----------Map----------------- */}
      <div>
        <div className="flex ">
          <Switch showMap={showMap} setshowMap={setshowMap} />
          <p className="ml-4">
            {Language.lng == "ENG" ? "Set location" : "Definir l'emplacement"}
          </p>
        </div>

        {showMap && (
          <div>
            <h3>
              {Language.lng == "ENG"
                ? "Plase set the property location on the map"
                : "SVP choisire l'emplacement sur la carte"}{" "}
              <br />{" "}
              <span className="font-bold">
                or{" "}
                <span
                  onClick={getDevicePosition}
                  className="  cursor-pointer rounded-2xl  px-1 text-red"
                >
                  use
                </span>{" "}
                the device location
              </span>
              (device location work better on devices with GPS){" "}
            </h3>
            <div className="z-0 h-[60vh] w-full">
              {location.error?.message && (
                <p className="text-secondary2 ">
                  {Language.lng == "ENG"
                    ? "Enabel GPS on your device"
                    : "Activer le GPS"}{" "}
                </p>
              )}

              <MapWithNoSSR
                position={
                  position[0] != 0 ? position : selectedMunicipality.position
                }
                setposition={setposition}
              />
            </div>
          </div>
        )}
      </div>

      {/* Contact */}

      <div className="px-4 py-8">
        <label
          className={`mb-1 font-medium ${
            errors.contact?.message ? "text-red" : ""
          }`}
        >
          Contact : {errors.contact && errors.contact.message}
        </label>
        <div className="mt-2 flex justify-between">
          <input
            onChange={(e) => {
              setValue("contact", e.currentTarget.value);
            }}
            type="tel"
            id="contact"
            name="contact"
            placeholder="Contact"
            className="h-16 w-full rounded-md border pl-2"
          />
        </div>
      </div>

      {/* Keywords filter */}
      <div className="px-4 py-8  ">
        <label>Description</label>
        <div className="mt-2 flex justify-between">
          <input
            onChange={(e) => {
              setValue("description", e.currentTarget.value);
            }}
            type="text"
            placeholder="Description"
            className="h-16 w-full rounded-md border pl-2"
          />
        </div>
      </div>

      <div className=" flex justify-center">
        {!addPost.isLoading&&<button
          type="submit"
          className="m-auto mb-1 self-center rounded-3xl bg-secondary1 p-1 hover:scale-105 active:scale-95  "
        >
          {!addPost.isLoading ? "Add Announcment" : "Sending data..."}
        </button>}
        {addPost.isLoading && (
          <span className="mx-auto ">
            <Loader />
          </span>
        )}
      </div>

      {addPost.isSuccess && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0" }}
          transition={{ duration: 1 }}
          className=" text-red-700  z-2000 absolute bottom-40 left-0 flex rounded border border-red bg-devider  px-4 py-3"
          role="alert"
        >
          <strong className="mr-1 font-bold">
            {Language.lng == "ENG" ? "Announcment added" : "Annonce ajouter"}{" "}
          </strong>
          <span className="block sm:inline">
            {" "}
            {Language.lng == "ENG"
              ? "Rederecting to Home page"
              : "Redireger to page d'acceuil"}
            .
          </span>
        </motion.div>
      )}

      {addPost.isError && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0" }}
          transition={{ duration: 1 }}
          className=" text-red-700 z-2000 absolute bottom-20 left-0 flex flex-col rounded border border-red bg-devider px-4  py-3 md:flex-row"
          role="alert"
        >
          <strong className="mr-1 font-bold">
            Oops ,{" "}
            {Language.lng == "ENG"
              ? "somthing went wrong"
              : "Quelque chose s'est mal passé"}{" "}
          </strong>
          <span className="block sm:inline">
            {" "}
            {Language.lng == "ENG"
              ? "Please retry again later"
              : "Veuillez réessayer plus tard"}
          </span>
        </motion.div>
      )}
    </form>
  );
};

export default LandFilters;
