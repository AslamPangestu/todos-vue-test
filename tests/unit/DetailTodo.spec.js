import { shallowMount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import DetailTodo from "../../src/pages/DetailTodo";
import mockData from "../../src/services/db.json";

jest.mock("axios");

let wrapper;

const setup = () => {
  wrapper = shallowMount(DetailTodo, {
    mocks: {
      $router: {
        push: jest.fn(),
      },
      $route: {
        params: {
          id: 1,
        },
      },
    },
  });
};

describe("DetailTodo Page", () => {
  it.todo("loading and show detail data");
  it.todo("update data and redirect to todolist");
});
