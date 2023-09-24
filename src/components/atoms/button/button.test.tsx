import Button from "./button";
import { render, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

describe("Button test", () => {
  test("Should render the specified label and register the click", () => {
    const onClick = vi.fn();
    const label = "This is a button";

    const { getByText, getByRole } = render(
      <Button onClick={onClick}>{label}</Button>
    );

    const button = getByRole("button");

    expect(getByText(label)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
