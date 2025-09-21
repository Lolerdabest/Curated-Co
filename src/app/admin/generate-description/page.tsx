import { GenerateForm } from "./_components/generate-form";

export default function GenerateDescriptionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">AI Product Description Generator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Create compelling product descriptions from just a few details.
        </p>
      </header>
      <div className="max-w-2xl mx-auto">
        <GenerateForm />
      </div>
    </div>
  );
}
