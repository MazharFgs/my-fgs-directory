import React from "react"
import {screen, render} from "@testing-library/react"

import {MyFgsDirectory} from "./my-fgs-directory";

describe("MyFgsDirectory", () => {
    it("should render the component", () => {
        render(<MyFgsDirectory contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
