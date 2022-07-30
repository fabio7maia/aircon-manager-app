import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import {
  Box,
  Button,
  Input,
  InputCheckbox,
  InputSelect,
  Modal,
  Table,
  Typography,
} from "react-xp-ui";
import { useLogger } from "~/shared";
import { configs } from "../../configs";

interface FormData {
  machine?: Record<string, any>;
  copperMeters?: number;
  needsBomb?: boolean;
}

interface TableItem {
  description: string;
  quantity: number;
  value: number;
  realValue: number;
}

const formatNumber = (amount: number, decimalPlaces = 2): string =>
  Math.round(amount).toFixed(decimalPlaces);

export default function () {
  const logger = useLogger();

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showApplyDiscountModal, setShowApplyDiscountModal] =
    React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({});
  const [tableData, setTableData] = React.useState<TableItem[]>([]);
  const [discount, setDiscount] = React.useState(0);

  const handleOnClickSaveAddModal = React.useCallback(() => {
    setTableData((oldValue) => {
      const newLines: TableItem[] = [];

      // machine line
      newLines.push({
        description: formData.machine?.description,
        quantity: 1,
        value: formData.machine?.value,
        realValue: formData.machine?.realValue,
      });

      // copper line
      newLines.push({
        description: "---> Metros de cobre",
        quantity: formData.copperMeters || 0,
        value: configs.general.copper.value,
        realValue: configs.general.copper.realValue,
      });

      // bomb line
      if (formData.needsBomb) {
        newLines.push({
          description: "---> Bomba",
          quantity: 1,
          value: configs.general.bomb.value,
          realValue: configs.general.bomb.realValue,
        });
      }

      // work line
      newLines.push({
        description: "---> Mão de obra",
        quantity: formData.machine?.timeOfWork,
        value: configs.general.priceByHour.value,
        realValue: configs.general.priceByHour.realValue,
      });

      return [...oldValue, ...newLines];
    });

    setFormData({});

    setShowAddModal(false);
  }, [formData]);

  const handleOnChangeInput = React.useCallback(
    (fieldName: keyof FormData) => (fieldValue: any) => {
      setFormData((oldValue) => ({
        ...oldValue,
        [fieldName]: fieldValue,
      }));
    },
    []
  );

  let total = 0;
  let realTotal = 0;

  tableData.forEach((item) => {
    total += item.value * configs.general.iva * item.quantity;
    realTotal += item.realValue * configs.general.iva * item.quantity;
  });
  const globalTotal = discount > 0 ? (total * (100 - discount)) / 100 : total;

  const proffit = globalTotal - realTotal;

  logger("AirConditioning", {
    showAddModal,
    formData,
    tableData,
    total,
    realTotal,
    globalTotal,
    proffit,
  });

  return (
    <>
      {showAddModal && (
        <Modal
          title="Adicionar Máquina"
          buttons={[{ onClick: handleOnClickSaveAddModal, children: "Gravar" }]}
          onClickOutside={() => setShowAddModal(false)}
        >
          <Box>
            <Box>
              <InputSelect
                items={configs.machines}
                formControl={{
                  label: "Qual a máquina?",
                }}
                propNameId="description"
                propNameText="description"
                propNameValue="description"
                value={formData.machine?.description}
                onChange={(value, selectedItem) =>
                  handleOnChangeInput("machine")(selectedItem)
                }
              />
            </Box>
            <Box className="mt-4">
              <Input
                type="number"
                formControl={{
                  label: "Qual o número de metros de cobre?",
                }}
                value={formData.copperMeters}
                onChange={handleOnChangeInput("copperMeters")}
              />
            </Box>
            <Box className="mt-4">
              <InputCheckbox
                formControl={{
                  label: "Precisa de bomba?",
                }}
                value={formData.needsBomb}
                onChange={handleOnChangeInput("needsBomb")}
              />
            </Box>
          </Box>
        </Modal>
      )}
      {showApplyDiscountModal && (
        <Modal
          title="Aplicar desconto"
          buttons={[
            {
              onClick: () => setShowApplyDiscountModal(false),
              children: "Gravar",
            },
          ]}
          onClickOutside={() => setShowApplyDiscountModal(false)}
        >
          <Box>
            <Input
              type="number"
              formControl={{
                label: "Qual o número de metros de cobre?",
              }}
              value={discount}
              onChange={(val) => setDiscount(Number(val))}
            />
          </Box>
          <Box className="flex flex-row justify-between mt-4">
            <Box className="flex items-center">
              <Typography className="font-bold text-lg">Lucro</Typography>
            </Box>

            <Box className="flex items-center">
              <Typography>{formatNumber(proffit)} €</Typography>
            </Box>
          </Box>
        </Modal>
      )}
      <Box className="p-2">
        <Box className="flex justify-center mb-4">
          <PaperAirplaneIcon height={120} width={120} />
          <Typography as="h1" className="py-8 font-black text-4xl">
            Ar Condicionado - Calculadora
          </Typography>
        </Box>

        <Box>
          <Box className="flex justify-end">
            <Button
              size="sm"
              appearance="accent"
              onClick={() => setShowApplyDiscountModal(true)}
            >
              Aplicar desconto
            </Button>
          </Box>
          <Box className="mt-2 p-4 border rounded-xl bg-gray-300">
            <Box className="flex flex-row justify-between">
              <Box className="flex items-center">
                <Typography className="font-bold text-lg">Total</Typography>
              </Box>

              <Box className="flex items-center">
                <Typography>{formatNumber(total)} €</Typography>
              </Box>
            </Box>

            <Box className="my-4">
              <Box className="flex flex-row justify-between">
                <Box className="flex items-center">
                  <Typography className="font-bold text-lg">
                    Desconto
                  </Typography>
                </Box>

                <Box className="flex items-center">
                  <Typography>{formatNumber(discount, 0)} %</Typography>
                </Box>
              </Box>

              <Box className="flex flex-row justify-between">
                <Box className="flex items-center">
                  <Typography className="font-bold text-lg">
                    Total Global
                  </Typography>
                </Box>

                <Box className="flex items-center">
                  <Typography>{formatNumber(globalTotal)} €</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="mt-16">
          <Box className="flex justify-end">
            <Button appearance="primary" onClick={() => setShowAddModal(true)}>
              Adicionar Máquina
            </Button>
          </Box>
          <Box className="mt-4">
            <Table
              columns={[
                {
                  id: "description",
                  head: () => "Descrição",
                  body: (item) => (
                    <Typography
                      className={
                        item.description.indexOf("--->") >= 0
                          ? ""
                          : "text-orange-600"
                      }
                    >
                      {item.description}
                    </Typography>
                  ),
                  foot: () => "Descrição",
                },
                {
                  id: "value",
                  head: () => "Valor",
                  body: (item) => <>{formatNumber(item.value)} €</>,
                  foot: () => "Valor",
                },
                {
                  id: "quantity",
                  head: () => "Qtd",
                  body: (item) => <>{item.quantity}</>,
                  foot: () => "Qtd",
                },
                {
                  id: "totalValue",
                  head: () => "Total (c/ IVA)",
                  body: (item) => (
                    <>
                      {formatNumber(
                        item.quantity * item.value * configs.general.iva
                      )}{" "}
                      €
                    </>
                  ),
                  foot: () => "Total (c/ IVA)",
                },
              ]}
              items={tableData}
              rowId={(row) => row.id}
            ></Table>
          </Box>
        </Box>
      </Box>
    </>
  );
}
