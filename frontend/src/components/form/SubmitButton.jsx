import { Button } from "@/components/ui/button";

export default function SubmitButton({ loading }) {
  return (
    <Button className="w-full" disabled={loading}>
      {loading ? "Sending..." : "Send Emails"}
    </Button>
  );
}
