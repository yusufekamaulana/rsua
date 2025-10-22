import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Rumah Sakit Universitas Airlanga"
        description="Rumah Sakit Universitas Airlanga"
      />
      <PageBreadcrumb pageTitle="Data Kejadian" />
      <div className="space-y-6">
          <BasicTableOne />
      </div>
    </>
  );
}
