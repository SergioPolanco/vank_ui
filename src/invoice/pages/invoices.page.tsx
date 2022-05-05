import { Grid } from "@mui/material"
import InvoicesTable from "../components/invoicesTable"

const Invoice = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <InvoicesTable />
      </Grid>
    </Grid>
  )
}

export default Invoice