// src/components/ListCards.tsx
import style from "@/styles/ListCards.module.scss";

// Define the ListCard class
export class ListCard {
  title: string;
  items: string[];
  icon: string; // Icon property

  constructor(title: string, items: string[], icon: string) {
    this.title = title;
    this.items = items;
    this.icon = icon; // Store icon
  }
}

// Define the Lists component that accepts an array of ListCard objects
interface ListsProps {
  lists: ListCard[]; // Array of ListCard objects
}

const ListCards = ({ lists }: ListsProps) => {
  return (
    <div className={style.ListCardsConteiner}>
      {lists.map((list, index) => (
        <div className={style.Card} key={index}>
          <div className={style.iconContainer}>
            <i className={`${list.icon} ${style.icon}`}></i> {/* Render FontAwesome icon */}
          </div>
          <h3>{list.title}</h3>
          <ul>
            {list.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListCards;
