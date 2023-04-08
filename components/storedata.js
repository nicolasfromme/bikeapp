import { DataGrid } from "@mui/x-data-grid"


export default function StoreData() {
    const data = [{
        id: 1,
        store: "Lindenhof bikestore",
        number_employees: 5,
        number_customers: 10,
        number_bikes_available: 20,
        number_rented: 30,
    },
    {
        id: 2,
        store: "Quadrate bikestore",
        number_employees: 8,
        number_customers: 15,
        number_bikes_available: 25,
        number_rented: 35,
    },
    {
        id: 3,
        store: "Bikestore 3",
        number_employees: 10,
        number_customers: 20,
        number_bikes_available: 30,
        number_rented: 40,  
    }]

    const columns = [
        { field: "store", headerName: "Name", width: 300 },
        { field: "number_employees", headerName: "Number of Employees", width: 200 },
        { field: "number_customers", headerName: "Number of Customers", width: 200 },
        { field: "number_bikes_available", headerName: "Number of Bikes Available", width: 250 },
        { field: "number_rented", headerName: "Number of Bikes Rented", width: 200 },
    ]

    return (
        <div>
            <h1>StoreData for {data.store}</h1>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={data} columns={columns} pageSize={5} />
            </div>
        </div>
    )
}