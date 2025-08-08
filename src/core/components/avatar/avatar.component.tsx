import { bind } from "@/core/styles/bind";
import styles from "./avatar.module.scss";
import { useState } from "react";
const cn = bind(styles);

interface Props {
  username: string;
  imageUrl?: string;
}

const getInitials = (username: string) =>
  username
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

export const Avatar = ({ username, imageUrl }: Props) => {
  const [hasErrorWithImage, setHasErrorWithImage] = useState(false);
  if (!imageUrl || hasErrorWithImage) {
    return (
      <div className={cn("avatar")}>
        <span className={cn("avatar__username")}>{getInitials(username)}</span>
      </div>
    );
  }
  return (
    <div className={cn("avatar", "avatar--image")}>
      <img
        src={imageUrl}
        alt={username}
        className={cn("avatar__image")}
        onError={() => setHasErrorWithImage(true)}
      />
    </div>
  );
};
