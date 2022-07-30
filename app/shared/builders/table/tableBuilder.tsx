import React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { Box } from "../../components";

type RowItem = Record<string, any>;

interface TableBuilderColumns<TItem extends RowItem> {
  title: React.ReactNode;
  propertyName?: keyof TItem;
  render?: (row: TItem, index: number) => React.ReactNode;
}

interface TableBuilderRows<TItem extends RowItem> {
  identifier: (row: TItem, index: number) => React.Key | undefined;
  onClick?: (row: TItem, index: number) => void;
}

interface TableBuilderProps<TItem extends RowItem> {
  columns: TableBuilderColumns<TItem>[];
  data: TItem[];
  rows: TableBuilderRows<TItem>;
}

export const TableBuilder = <TItem extends RowItem>({
  columns = [],
  data = [],
  rows,
}: TableBuilderProps<TItem>) => {
  return (
    <Box className="overflow-x-auto w-full">
      <Box>
        <table className="table table-normal w-full">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={`thead-${index}--${column.title}`}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={rows.identifier(item, rowIndex)}
                className="hover"
                onClick={() => rows.onClick?.(item, rowIndex)}
              >
                {columns.map((column) => {
                  let cellContent: React.ReactNode = <></>;

                  try {
                    if (column.render) {
                      cellContent = column.render(item, rowIndex);
                    } else if (column.propertyName) {
                      cellContent = item[column.propertyName];
                    }
                  } catch (err) {
                    cellContent = <></>;
                  }

                  return <td>{cellContent}</td>;
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {columns.map((column, index) => (
                <th key={`tfoot-${index}--${column.title}`}>{column.title}</th>
              ))}
            </tr>
          </tfoot>
        </table>
      </Box>
      <Box className="btn-group py-4 justify-end">
        <button className="btn btn-disabled">
          <ChevronDoubleLeftIcon height="16px" />
        </button>
        <button className="btn">
          <ChevronLeftIcon height="16px" />
        </button>
        <span className="btn">Page 22</span>
        <button className="btn">
          <ChevronRightIcon height="16px" />
        </button>
        <button className="btn">
          <ChevronDoubleRightIcon height="16px" />
        </button>
      </Box>
    </Box>
  );
};
