import React from "react";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  Input,
  InputCheckbox,
  InputEmail,
  InputPassword,
  InputSelect,
  InputText,
  InputTextarea,
  Modal,
  Showcase,
  Swap,
  TableBuilder,
  Typography,
  useModal,
} from "~/shared";
import { PublicLayout } from "~/layouts";

export default function () {
  const modalName = "modalShowcase";
  const { show, hide } = useModal({ name: modalName });

  return (
    <PublicLayout blocks={{ all: false }}>
      <Box className="text-center">
        <Typography as="h1">Shared Showcase</Typography>
        <Box className="py-4">
          <Showcase component="Button">
            <Button onClick={() => {}}>Button demo</Button>
            <Button variant="secondary" onClick={() => {}}>
              Button demo secondary
            </Button>
          </Showcase>
        </Box>
        <Box className="py-4">
          <Showcase component="Typography">
            <Typography as="h1">Typography h1 demo</Typography>
            <Typography as="h2">Typography h2 demo</Typography>
            <Typography as="h3">Typography h3 demo</Typography>
            <Typography as="h4">Typography h4 demo</Typography>
            <Typography as="h5">Typography h5 demo</Typography>
            <Typography as="h6">Typography h6 demo</Typography>
            <Typography>Typography span demo</Typography>
            <Typography as="p">Typography p demo</Typography>
          </Showcase>
        </Box>
        <Box className="py-4">
          <Showcase component="Collapse">
            <Collapse title="Showcase demo title">
              Showcase demo description
            </Collapse>
          </Showcase>
        </Box>
        <Box className="py-4">
          <Showcase component="Input">
            <Input
              type="number"
              name="input-number-showcase"
              label="Input number demo"
              placeholder="Input number demo"
            />
            <InputCheckbox
              name="input-checkbox-showcase"
              label="Input checkbox demo"
            />
            <InputEmail
              name="input-email-showcase"
              label="Input email demo"
              placeholder="Input email demo"
            />
            <InputPassword
              name="input-password-showcase"
              label="Input password demo"
              placeholder="Input password demo"
            />
            <InputText
              name="input-text-showcase"
              label="Input text demo"
              placeholder="Input text demo"
            />
            <InputSelect
              name="input-select-showcase"
              label="Input select demo"
              placeholder="Input select demo"
              items={["Option 1", "Option 2"]}
            />
            <InputTextarea
              name="input-textarea-showcase"
              label="Input textarea demo"
              placeholder="Input textarea demo"
            />
          </Showcase>
        </Box>
        <Box className="py-4">
          <Showcase component="Drawer">
            <Drawer>Drawer content</Drawer>
          </Showcase>
        </Box>
        <Box className="py-4">
          <Showcase component="Modal">
            <Button onClick={show}>Open</Button>
            <Modal
              name={modalName}
              buttons={{
                secondary: {
                  label: "Back",
                  onClick: hide,
                },
                primary: {
                  label: "Next",
                  onClick: hide,
                },
              }}
            >
              Modal content
            </Modal>
          </Showcase>
        </Box>
        <Box className="py-4">
          <Showcase component="Table">
            <TableBuilder
              columns={[
                {
                  // title: (
                  //   <label>
                  //     <input type="checkbox" className="checkbox" />
                  //   </label>
                  // ),
                  // render: () => (
                  //   <label>
                  //     <input type="checkbox" className="checkbox" />
                  //   </label>
                  // ),
                  title: "Id",
                  propertyName: "id",
                },
                {
                  title: "Name",
                  propertyName: "name",
                },
                {
                  title: "Job",
                  propertyName: "job",
                },
                {
                  title: "Favorite color",
                  propertyName: "favoriteColor",
                },
                {
                  title: <></>,
                },
              ]}
              data={[
                {
                  id: 0,
                  name: "Cy Ganderton",
                  job: "Quality Control Specialist",
                  favoriteColor: "Blue",
                },
                {
                  id: 1,
                  name: "Brice Swyre",
                  job: "Tax Accountant",
                  favoriteColor: "Red",
                },
              ]}
              rows={{
                identifier: (row) => row.id,
                onClick: (row, index) =>
                  alert(`Row ${index} clicked=${JSON.stringify(row)}`),
              }}
            />
          </Showcase>
        </Box>
        <Box className="py-4">
          <Showcase component="Swap">
            <Swap items={["1", 2, 3, 4]} />
          </Showcase>
        </Box>
      </Box>
    </PublicLayout>
  );
}
