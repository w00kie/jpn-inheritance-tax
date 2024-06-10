import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TypographyH3 } from "./typography";

export const DetailsCard = () => {
  return (
    <div className="w-full md:max-w-4xl space-y-6">
      <TypographyH3>Additional Details</TypographyH3>
      <Accordion type="multiple">
        <AccordionItem value="statutory-heirs">
          <AccordionTrigger>What are statutory heirs?</AccordionTrigger>
          <AccordionContent className="space-y-6">
            <p>
              Statutory heirs are individuals who are legally entitled to
              inherit a deceased person's estate under Japanese law. The Civil
              Code of Japan outlines the hierarchy and rights of statutory heirs
              as well as the standard distribution of assets among them.
            </p>
            <p>
              This tool assumes the deceased to be one of the parent of a
              typical family unit with a surviving spouse and/or children. This
              is expected to be the most common case and simplifies greatly the
              calculation. Any deviation from this case will require an
              adjustment of the standard distribution of assets for the
              calculation of the tax burden.
            </p>
            <p>
              Things like adopted children or deceased children with grand
              children can affect the distribution and are difficult to model in
              a simple tool like this one. If you have a more complex case, you
              can refer to{" "}
              <a
                href="https://souzoku-pro.info/columns/isanbunkatsu/10/"
                className="text-blue-600 dark:text-blue-500 underline hover:no-underline"
              >
                this Japanese webpage
              </a>
              that lists 52 different patterns of statutory heirs and their
              standard distribution of assets.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="capital-gains">
          <AccordionTrigger>
            Post inheritance issues to keep in mind
          </AccordionTrigger>
          <AccordionContent className="space-y-6">
            <p>
              If the estate includes any non-cash assets, such as real estate or
              stocks, the market value of these assets at the time of death will
              be used to calculate the inheritance tax.
            </p>
            <p>
              The cost basis of these assets are transferred to the heirs as-is.
              So if any of the assets are sold after death, even if the sale
              happens before assets have been properly distributed, any capital
              gains generated will be borne by the heirs.
            </p>
            <p>
              This cost basis can be difficult to estimate for real estate
              properties purchased abroad many decades ago. The currency
              exchange rate at the time of purchase must also be accounted for.
              If the original cost cannot be determined, 5% of the sale price
              will be used as the cost basis.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sources">
          <AccordionTrigger>Sources and References</AccordionTrigger>
          <AccordionContent className="space-y-6">
            Calculations are based on{" "}
            <a
              href="https://japanfinance.github.io/tax/inheritance/"
              className="text-blue-600 dark:text-blue-500 underline hover:no-underline"
            >
              the guide
            </a>{" "}
            written by many good volunteers of the{" "}
            <a
              href="https://www.reddit.com/r/JapanFinance"
              className="text-blue-600 dark:text-blue-500 underline hover:no-underline"
            >
              /r/JapanFinance
            </a>{" "}
            community. Please refer to theses resources for more complex cases.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
