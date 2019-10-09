// import React from "react";
// import { shallow } from "enzyme";
// import Table from "./Table";
// import data from "./story_test_data.js";

// describe("Table", () => {
//   it("renders children when passed in", () => {
//     const wrapper = shallow(
//       <Table data={tableData}>
//         {({ rows, sort, loading, filter }) => {
//           return (
//             <React.Fragment>
//               <h1>Spec</h1>
//             </React.Fragment>
//           )
//         }}
//       </Table>
//     );
//     expect(wrapper.contains(<h1>Spec</h1>)).to.equal(true);
//   });
//
//   it('renders correctly', () => {
//     const wrapper = shallow(<Table />);
//     expect(wrapper).toMatchSnapshot();
//     // On the first run of this test, Jest will generate a snapshot file automatically.
//   });
// });

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });

  // it("we have test data", () => {
  //   expect(data).not.toBe(null);
  //   expect(data).not.toBe(undefined);
  // });

  // it("renders children when passed in", () => {
  //   const wrapper = shallow(
  //     <Table data={tableData}>
  //       {({ rows, sort, loading, filter }) => {
  //         return (
  //           <div>
  //             <h1>Spec</h1>
  //           </div>
  //         )
  //       }}
  //     </Table>
  //   );
  //   expect(wrapper.contains(<h1>Spec</h1>)).to.equal(true);
  // });
});
