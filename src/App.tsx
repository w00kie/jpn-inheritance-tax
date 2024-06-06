import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeProvider } from "@/components/theme-provider";
import { Form } from "@/components/ui/form";
import { ModeToggle } from "@/components/mode-toggle";
import { TypographyH1, TypographyLead } from "@/components/typography";
import { NumberFormField } from "@/components/number-form-field";
import { CheckboxFormField } from "@/components/checkbox-form-field";
import { CalculationCard } from "@/components/calculation-card";

export const formSchema = z.object({
  totalApplicableAssets: z.number().min(0).default(0),
  numberOfStatutoryHeirs: z.number().min(0).default(0),
  spouse: z.boolean().default(false),
  isStatutoryHeir: z.boolean().default(true),
});

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalApplicableAssets: 0,
      numberOfStatutoryHeirs: 1,
      spouse: false,
      isStatutoryHeir: true,
    },
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="relative min-h-screen w-full">
        <header style={{ position: "fixed", top: 5, right: 5 }}>
          <ModeToggle />
        </header>
        <section className="flex flex-col lg:flex-row items-center justify-center gap-6 px-6 py-16">
          <div className="lg:w-2/3 lg:max-w-lg space-y-6">
            <TypographyH1>Inheritance Tax Calculator</TypographyH1>
            <TypographyLead>
              This is a simple Japanese inheritance tax calculator. It is meant
              to cover the case of a foreigner in Japan receiving an inheritance
              from abroad with all other heirs outside of Japan.
            </TypographyLead>
            <Form {...form}>
              <form className="space-y-6">
                <NumberFormField
                  control={form.control}
                  name="totalApplicableAssets"
                  label="Total Applicable Assets"
                  description="The total value of the assets that are subject to inheritance tax."
                  tooltip={
                    <div className="text-muted-foreground leading-normal space-y-2">
                      <p>
                        This is the total value of the estate for Japanese
                        inheritance-tax purposes. When the deceased is a
                        foreigner living outside Japan, this will be the value
                        of:
                      </p>
                      <ul className="list-disc list-outside ml-4" role="list">
                        <li>
                          all assets inherited by the Japan-resident heir
                          (assuming they are an "unlimited taxpayer" for
                          Japanese inheritance tax purposes)
                        </li>
                        <li>all assets located in Japan</li>
                        <li>
                          all assets which were previously subjected to Japan's
                          "early inheritance" system
                        </li>
                      </ul>
                      <p>
                        Note that this does not include all assets of the
                        estate, only the ones subject to Japanese inheritance
                        tax.
                      </p>
                    </div>
                  }
                />
                <NumberFormField
                  control={form.control}
                  name="numberOfStatutoryHeirs"
                  label="Statutory Heirs"
                  description="The number of statutory heirs."
                />
                <CheckboxFormField
                  control={form.control}
                  name="spouse"
                  label="Spouse"
                  description="Check this box if the spouse of the deceased is one of the statutory heirs."
                />
                <CheckboxFormField
                  control={form.control}
                  name="isStatutoryHeir"
                  label="Are you a statutory heir?"
                  description="Japanese taxes will be majorated by 20% for non-statutory heirs."
                />
              </form>
            </Form>
          </div>
          <div className="lg:w-1/3 lg:max-w-md space-y-6">
            <CalculationCard form={form} />
          </div>
        </section>
        <footer className="absolute block inset-x-0 bottom-0 pb-4 text-center text-muted-foreground">
          <p>
            Made with ❤️ by{" "}
            <a href="https://github.com/w00kie">François Rejeté</a> in 🇯🇵
          </p>
        </footer>
      </main>
    </ThemeProvider>
  );
}

export default App;
