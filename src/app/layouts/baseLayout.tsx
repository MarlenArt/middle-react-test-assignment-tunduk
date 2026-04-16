import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

import styles from "./baseLayout.module.scss";

export const BaseLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
