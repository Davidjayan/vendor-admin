import country from "@/utils/country/index";
import errorHandler from "@/utils/errorHandler";
import { useSnackBar } from "@/utils/providers/AlertProvider";
import AddIcon from "@mui/icons-material/AddCircleOutlineSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  Sheet,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import {
  Pagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetch } from "use-http";
import { Container } from "./UIHelpers/Container";
import { Loader } from "./UIHelpers/Loader";
import { useConfirmationAlert } from "@/utils/providers/ConfirmationAlertProvider";
interface Props {
  pageCount: number;
  limit: number;
  vendors: any;
  page: number;
}

export const ListVendors = (props: Props) => {
  const { limit, pageCount, vendors, page } = props;
  const { alert } = useSnackBar();
  const { confirmationAlert } = useConfirmationAlert();

  const countryList: any = country;
  const router = useRouter();

  return (
    <Box>
      <Grid
        sx={{
          padding: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        container
        direction={"row"}
      >
        <Typography level="body1" fontWeight={"bold"}>
          Available Vendors
        </Typography>
        <Button
          onClick={() => {
            router.push("/add-vendor");
          }}
        >
          Create Vendor &nbsp;&nbsp; <AddIcon />
        </Button>
      </Grid>
      {vendors ? (
        vendors.length>1?(

        <Container>
          <Sheet>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Vendor Name",
                    "Bank account no.",
                    "Bank name",
                    "Country",
                  ].map((colhead) => (
                    <TableCell key={colhead}>{colhead}</TableCell>
                  ))}
                  <TableCell width={"5%"}>{""}</TableCell>
                  <TableCell width={"5%"}>{""}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors?.map((vendor: any, key: any) => (
                  <TableRow key={vendor._id}>
                    {["vendorName", "bankAccNo", "bankName"].map((key) => (
                      <TableCell key={vendor._id + key}>
                        {vendor[key]}
                      </TableCell>
                    ))}
                    <TableCell>
                      {countryList[vendor.country].emoji}&nbsp;&nbsp;
                      {countryList[vendor.country].name}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit vendor">
                        <IconButton
                          onClick={() => {
                            router.push(`/edit-vendor?_id=${vendor._id}`);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete vendor">
                        <IconButton
                          color="danger"
                          onClick={() => {
                            confirmationAlert(
                              "Are you sure want to delete?",
                              async () => {
                                try {
                                  const res = await fetch(
                                    `/api/delete?_id=${vendor._id}`
                                  );
                                  if (res) {
                                    alert("Successfully deleted", "success");
                                    router.reload();
                                  }
                                } catch (error) {
                                  errorHandler(error, alert);
                                }
                              },
                              async () => {}
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <List></List>
          </Sheet>
        </Container>
        ):(
          <Container>
            <Typography>
              No data found
            </Typography>
          </Container>
        )
      ) : (
        <Loader minHeight={20} />
      )}
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          paddingY: 5,
        }}
      >
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, page) => {
            router.push(`?page=${page}&skip=${(page - 1) * limit}`);
          }}
        />
      </Box>
    </Box>
  );
};
