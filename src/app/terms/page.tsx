import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Rental Agreement & Terms of Service</CardTitle>
          <CardDescription>Last Updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-invert max-w-none">
            <p>
                This Rental Agreement ("Agreement") is made between Curated Co. ("Owner") and the individual electronically signing this agreement ("Renter"). This Agreement is legally binding and enforceable in a court of law.
            </p>

            <h3 className="text-xl font-headline">1. Rental Terms</h3>
            <p>
                The Renter agrees to rent the specified item(s) for the agreed-upon rental period. The item(s) remain the sole property of the Owner.
            </p>

            <h3 className="text-xl font-headline">2. Return of Property</h3>
            <p>
                The Renter must return the item(s) in the same condition as they were received, normal wear and tear excepted, at the end of the rental period. 
                <strong>Failure to return the item(s) will be considered theft.</strong>
            </p>

            <h3 className="text-xl font-headline">3. Penalties for Non-Return</h3>
            <p>
                If the Renter fails to return the item(s) by the due date, the Owner reserves the right to pursue any and all legal remedies. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Reporting the item(s) as stolen to the relevant authorities.</li>
                <li>Initiating legal proceedings to recover the full replacement value of the item(s), plus any legal fees incurred.</li>
                <li>Publicly listing the Renter's provided identification (Minecraft Username, Discord ID) as a delinquent account.</li>
            </ul>

            <h3 className="text-xl font-headline">4. Governing Law</h3>
            <p>
                This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the Owner operates. The Renter agrees to submit to the personal jurisdiction of these courts.
            </p>

            <h3 className="text-xl font-headline">5. Agreement</h3>
            <p>
                By checking the "I agree to the rental agreement" box on the rental request form, the Renter acknowledges that they have read, understood, and agree to be bound by all terms and conditions of this Agreement. This action constitutes a legal and binding electronic signature.
            </p>

            <div className="text-center pt-6">
                <Button asChild>
                    <Link href="/rentals">Back to Rentals</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
