import { createBrowserRouter } from "react-router-dom";
import { CandidatesList } from "@/pages/CandidatesList";
import { CandidateDetail } from "@/pages/CandidateDetail";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        element: <CandidatesList />,
      },
      {
        path: "/product/:id", // Динамический параметр для деталки
        element: <CandidateDetail />,
      },
    ],
  },
]);
