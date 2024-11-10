import s from "./header.module.sass";
import { filterCategories } from "../../store/todoSlice";
import { useAppDispatch } from "../../../hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faList,
  faBriefcase,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const dispatch = useAppDispatch();

  const showCategories = (
    e: React.MouseEventHandler<HTMLLIElement>,
    title: string
  ) => {
    dispatch(filterCategories(title));
  };
  const todoCategories1 = [
    {
      title: "all",
      icon: faList,
    },
    {
      title: "home",
      icon: faHouse,
    },
    {
      title: "work",
      icon: faBriefcase,
    },
    {
      title: "one day",
      icon: faClock,
    },
  ];
  // const todoCategories = ["all", "home", "work", "one day"];
  return (
    <div className={s.header}>
      <h1 className={s.header__title}>Todo List</h1>
      <nav className={s.header__navigation}>
        <ul className={s.header__navigation__links}>
          {todoCategories1.map(({ title, icon }, index: number) => (
            <li key={index} onClick={(e) => showCategories(e, title)}>
              {title.toUpperCase()}
              <span>
                <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
