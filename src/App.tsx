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
import { DetailsCard } from "@/components/details";

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
      <header className="fixed top-2 right-2">
        <ModeToggle />
      </header>
      <main className="xl:w-5/6 lg:max-w-5xl md:mx-auto p-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <section id="title" className="md:col-span-5 p-4">
            <TypographyH1>Inheritance Tax Calculator</TypographyH1>
          </section>
          <section id="inputs" className="md:col-span-3 p-4 flex flex-col">
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
                  label="Your Share of the Estate"
                  description="The total value of the assets that are subject to inheritance tax."
                  tooltip={
                    <div className="text-muted-foreground leading-normal space-y-2">
                      <p>
                        This is the total value of the estate for Japanese
                        inheritance-tax purposes. When the deceased is a
                        foreigner living outside Japan, this will be the value
                        of:
                      </p>
                      <ul className="list-disc list-outside ml-4">
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
          </section>
          <section id="calculation" className="md:col-span-2 p-4">
            <CalculationCard form={form} />
          </section>
          <section
            id="additional-details"
            className="md:col-span-5 p-4 text-gray-500 dark:text-gray-400 pb-16"
          >
            <DetailsCard />
          </section>
        </div>
      </main>
      <footer className="sticky top-[100vh] pb-4 text-center text-muted-foreground">
        <p>
          Made with ❤️ by{" "}
          <a href="https://github.com/w00kie">François Rejeté</a> in 🇯🇵
        </p>
      </footer>
    </ThemeProvider>
  );
}

export default App;
