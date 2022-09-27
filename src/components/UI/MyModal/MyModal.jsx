import React from "react";
import cl from "./MyModal.module.css";

const MyModal = ({children, visible, setVisible}) => {

  const rootClasses = [cl.myModal];

  if (visible) {
    rootClasses.push(cl.active);
  }

  //(e) => e.stopPropagation() чтобы не закрывалось окно при нажатии на контентную область
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default MyModal;
