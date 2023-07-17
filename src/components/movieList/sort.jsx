/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
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
import { connect } from "react-redux";
import store from "../store/store";
const people = [
  { name: "Popularity Descending", value: "popularity.desc" },
  { name: "Popularity Ascending", value: "popularity.asc" },
  { name: "Rating Descending", value: "vote_average.desc" },
  { name: "Rating Ascending", value: "vote_average.asc" },
  { name: "Release Date Descending", value: "primary_release_date.desc" },
  { name: "Title (A-Z)", value: "title.asc" },
  { name: "Title (Z-A)", value: "title.desc" },
];
function sort() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(people[0]);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedChange = (value) => {
    setSelected(value);
    store.dispatch({ type: "UPDATE_SORT", payload: value.value });
  };

  return (
    <div className="relative p-3 bg-white rounded-lg mt-5 drop-shadow-2xl">
      <div className="flex justify-between" onClick={() => handleIsOpen()}>
        <div className="font-semibold">Sort</div>
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
          <div className="border-t-2 mt-2 pt-2 text-gray-400">
            Sort Results By
          </div>

          <div className="top-16 w-72">
            <Listbox
              value={selected}
              onChange={(value) => {
                handleSelectedChange(value);
              }}
            >
              <div className="relative mt-1 ">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
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
                  <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
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
                              {person.name}
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
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.example,
});

export default connect(mapStateToProps)(sort);
