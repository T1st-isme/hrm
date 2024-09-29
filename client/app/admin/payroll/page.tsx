import MainLayout from "../../components/MainLayout";
import withAuth from "../../components/withAuth";
const PayrollPage = () => {
    return (
        <MainLayout title="Payroll">
            <div>Payroll</div>
        </MainLayout>
    );
};

export default withAuth(PayrollPage, ["admin"]);
