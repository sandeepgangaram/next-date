import { verifyEmail } from "@/src/actions/authActions";
import CardWrapper from "@/src/components/CardWrapper";
import ResultMessage from "@/src/components/ResultMessage";
import { Spinner } from "@nextui-org/react";
import { MdOutlineMailOutline } from "react-icons/md";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const result = await verifyEmail(searchParams.token);

  return (
    <CardWrapper
      headerIcon={MdOutlineMailOutline}
      headerText="Vrifying your email address"
      body={
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex flex-row items-center">
            <p>Verifying your email address. Please wait...</p>
            {!result && <Spinner color="secondary" />}
          </div>
        </div>
      }
      footer={<ResultMessage result={result} />}
    />
  );
};
export default VerifyEmailPage;
