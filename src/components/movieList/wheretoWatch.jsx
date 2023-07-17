/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { APIURL, Header, IMAGEURL } from "../config/config";
import store from "../store/store";
axios.defaults.headers.common = Header;

function wheretoWatch() {
  const reduxValue = store.getState().example;
  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState([]);
  const [selected, setSelected] = useState(reduxValue.country);
  const [watchProvider, setWatchProvider] = useState([]);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleWatchProvider = async (value) => {
    store.dispatch({ type: "UPDATE_COUNTRY", payload: value.iso_3166_1 });
    setSelected(value);
    const endPoint = APIURL + "watch/providers/movie";
    const params = {
      language: "en-US",
      watch_region: value.iso_3166_1,
    };
    await axios.get(endPoint, { params }).then((res) => {
      setWatchProvider(res.data.results);
    });
  };

  const handleRegion = async () => {
    const endPoint = APIURL + "watch/providers/regions";
    const params = {
      language: "en-US",
    };
    axios.get(endPoint, { params }).then((res) => {
      setRegion(res.data.results);
    });
  };

  const handleSelectedWatchProvier = (value) => {
    let updatedSelectedProvider;
    if (selectedProvider.includes(value)) {
      updatedSelectedProvider = selectedProvider.filter((v) => v !== value);
    } else {
      updatedSelectedProvider = [...selectedProvider, value];
    }
    setSelectedProvider(updatedSelectedProvider);
    store.dispatch({
      type: "UPDATE_WATCH_PROVIDERS",
      payload: updatedSelectedProvider,
    });
  };

  useEffect(() => {
    handleRegion();
  }, []);
  return (
    <div className="p-3 bg-white rounded-lg mt-5 drop-shadow-2xl">
      <div className="flex justify-between" onClick={() => handleIsOpen()}>
        <div className="font-semibold">Where To Watch</div>
        <div className="flex">
          {isOpen ? (
            <ChevronDownIcon className="h-5 w-5 self-center " />
          ) : (
            <ChevronRightIcon className="h-5 w-5 self-center " />
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div className="border-t-2 mt-2 pt-2 text-gray-400">Country</div>
          {/* Select Country*/}
          <div className="top-16 w-72 ">
            <Listbox
              value={selected}
              onChange={(value) => handleWatchProvider(value)}
            >
              <div className="relative mt-1 ">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {selected.english_name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {region.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.english_name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Select Watch Provider */}
          <div className="grid grid-cols-4 gap-4 mt-5">
            {watchProvider.length === 0 ? (
              <>
                {/* <div className="flex self-center">
                  <CircularProgress />
                </div> */}
              </>
            ) : (
              <>
                {watchProvider.map((name, index) => {
                  return (
                    <>
                      <div
                        className="relative flex justify-center self-center"
                        key={index}
                      >
                        <img
                          className="rounded-lg"
                          src={IMAGEURL + name.logo_path}
                          alt={name.provider_name}
                        />
                        <div
                          onClick={() =>
                            handleSelectedWatchProvier(name.provider_id)
                          }
                          className={
                            selectedProvider.includes(name.provider_id)
                              ? "absolute inset-0 selected hover:bg-white rounded-lg transition-colors opacity-70 flex items-center justify-center"
                              : "absolute inset-0 hover:bg-blue-300  rounded-lg transition-colors opacity-70"
                          }
                        >
                          <div
                            className={
                              selectedProvider.includes(name.provider_id)
                                ? "flex items-center justify-center"
                                : "hidden"
                            }
                          >
                            <CheckIcon className="h-10 w-10" />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default wheretoWatch;
