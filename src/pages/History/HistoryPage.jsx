import { Header } from "../../components/Header/Header";
import { RequestList } from "./Request/RequestsList";
import useHistoryStore from "../../store/historyStore";
import style from "./HistoryPage.module.css";
import { NavLink } from "react-router-dom";
export function History() {
  const { requests, removeRequest, clearHistory } = useHistoryStore();

  return (
    <>
      <Header />
      <div className={style.container}>
        <RequestList requests={requests} onDelete={removeRequest} />

        <div className={style.buttonsContainer}>
          <NavLink to="/csvgenerate" className={style.generateLink}>
            <button className={style.generateButton}>Сгенерировать еще</button>
          </NavLink>

          <button onClick={clearHistory} className={style.clearButton}>
            Очистить всё
          </button>
        </div>
      </div>
    </>
  );
}
