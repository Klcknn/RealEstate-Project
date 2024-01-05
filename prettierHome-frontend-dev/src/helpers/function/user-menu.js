import userMenuData from "../data/user-menu.json";
import userProfileMenu from "../data/profile-menu.json";

export const getMenuItems = (role) => {
    if (!userMenuData || !role) return;
    const menu = userMenuData[role.toLowerCase()];
    return menu;
};
export const getProfileMenu = (role) => {
    if (!userProfileMenu || !role) return;
    const menu = userProfileMenu[role.toLowerCase()];
    return menu;
};