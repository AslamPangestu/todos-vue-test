import { shallowMount } from "@vue/test-utils";
import TodoItem from "../../src/components/TodoItem";

describe("TodoItem Component", () => {
  const PROPS = [
    {
      isDone: false,
      todo: "masak",
      todoId: 1,
      expected: false,
    },
    {
      isDone: true,
      todo: "masak",
      todoId: 1,
      expected: true,
    },
  ];
  test.each(PROPS)(
    "show todo with del tag if isDone only",
    ({ isDone, todo, todoId, expected }) => {
      const wrapper = shallowMount(TodoItem, {
        stubs: ["router-link"],
        propsData: { isDone, todo, todoId },
      });
      const deleteEl = wrapper.findComponent({ ref: "delRef" });
      expect(deleteEl.exists()).toBe(expected);
    }
  );
  it("have correct redirect link", () => {
    const wrapper = shallowMount(TodoItem, {
      stubs: ["router-link"],
      propsData: {
        isDone: PROPS[0].isDone,
        todo: PROPS[0].todo,
        todoId: PROPS[0].todoId,
      },
    });
    expect(wrapper.findComponent({ ref: "linkRef" }).attributes("to")).toBe(
      `/${PROPS[0].todoId}`
    );
  });
});
