import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo } from "react";
import Button from "../../Common/Button";
import classes from "./styles.module.scss";

type HeaderMainProps = {
  imgUrl: string | undefined;
};

const HeaderMain: React.FC<HeaderMainProps> = memo(({ imgUrl }) => {
  const router = useRouter();

  return (
    <header className={classes.headerMain}>
      <div className={classes.adopWrapper}>
        {imgUrl !== undefined ? (
          <Image
            loader={() => imgUrl}
            src={imgUrl}
            objectFit='cover'
            draggable={false}
            layout='fill'
            unoptimized
            priority
          />
        ) : (
          <></>
        )}
      </div>

      <div className={classes.title}>
        <h2>ARMAGGEDON V2</h2>
        <span>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</span>
      </div>

      <ul className={classes.menu}>
        <li>
          <Button asLink color='#FFF' active={router.pathname === "/"}>
            <Link href={"/"}>Астероиды</Link>
          </Button>
        </li>
        <li>
          <Button asLink color='#FFF' active={router.pathname === "/order"}>
            <Link href={"/order"}>Заказ</Link>
          </Button>
        </li>
      </ul>
    </header>
  );
});

export default HeaderMain;
