import React from "react";
import { MinusIcon } from "@heroicons/react/solid";
import { Link } from "remix";
import path from "path";
import { Box } from "../box";
import { Typography } from "../typography";

interface MenuItem {
  label: React.ReactNode;
  url: string;
  onClick?: (item: MenuItem) => void;
  disable?: boolean;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface MenuProps {
  items: MenuItem[];
}

const checkMenuItemActive = (item: MenuItem) => {
  try {
    const url = window.location.href;

    return url.includes(item.url);
  } catch (err) {
    return false;
  }
};

export const Menu: React.FC<MenuProps> = ({ items }) => {
  const renderMenuItem = React.useCallback((item: MenuItem) => {
    const { label } = item;

    return (
      <>
        {typeof label === "string" ? (
          <Box row className="items-center">
            <MinusIcon height="16" />
            <Typography bold className="pl-2">
              {label}
            </Typography>
          </Box>
        ) : (
          label
        )}
      </>
    );
  }, []);

  const renderParentMenuItem = React.useCallback(
    (items: MenuItem[], parentItem?: MenuItem, level = 0) => {
      console.log("Menu > renderParentMenuItem", { items, level });

      return (
        <Box>
          <Box as="ul" className="menu">
            {items.map((item) => {
              const { label, children, onClick, disable = false, url } = item;
              const composedUrl = parentItem
                ? path.join(parentItem.url, url)
                : url;

              return (
                <Box
                  key={composedUrl}
                  as="li"
                  className={level === 0 ? `py-2` : `py-2 pl-2`}
                  onClick={() => onClick?.(item)}
                >
                  {disable || children ? (
                    <>
                      <a>{renderMenuItem(item)}</a>
                      {children &&
                        renderParentMenuItem(children, item, level++)}
                    </>
                  ) : (
                    <Link
                      to={composedUrl}
                      className={
                        checkMenuItemActive(item) ? "active px-0" : "px-0"
                      }
                    >
                      {renderMenuItem(item)}
                    </Link>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    },
    []
  );

  return <>{renderParentMenuItem(items)}</>;
};
