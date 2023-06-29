import React from "react";
import s from "./index.module.css";

export const PageNotFound = () => {
  return (
    <div class={s.section}>
      <h1 class={s.error}>404</h1>
      <div class={s.page}>Ooops!!! Страница, которую вы ищете, не найдена</div>
      <a class={s.back_home} href="/">Вернуться домой</a>
    </div>
  );
};
