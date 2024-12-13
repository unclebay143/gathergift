import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyWithComma } from "@/lib/utils";
import { Wish } from "@/types";

type WishPreviewProps = {
  wishData: Wish;
};

export function WishPreview({ wishData }: WishPreviewProps) {
  // const totalRaised = wishData.items.reduce(
  //   (sum, item) => sum + (Number(item.price) || 0),
  //   0
  // );
  const currencySymbol = wishData.currency === "USD" ? "$" : "₦";

  return (
    <div className='max-w-2xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>{wishData.title || "Untitled Wish"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground mb-4'>
            {wishData.description || "No description provided."}
          </p>
          <div className='text-sm text-muted-foreground'>
            {wishData.endDate
              ? `Ends on ${new Date(wishData.endDate).toLocaleDateString()}`
              : "No end date set"}
          </div>
          {wishData.thankYouMessage && (
            // <div className='mt-6 p-6 rounded-lg border bg-zinc-50 shadow-inner'>
            <div className='mt-6 p-6 rounded-lg bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-purple-100/50 dark:border-purple-900/50 shadow-inner'>
              <h3 className='font-semibold mb-2'>Thank You Message</h3>
              <p className='text-sm italic'>
                &quot;{wishData.thankYouMessage}&quot;
              </p>
            </div>
          )}
          {wishData.itemsEnabled && (
            <div className='mt-6'>
              <h3 className='font-semibold mb-2'>Wish Items</h3>
              {wishData.items && wishData.items.length > 0 ? (
                <ul className='space-y-4'>
                  {wishData.items.map((item, index) => (
                    <li key={index} className='flex flex-col'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          {item.image && (
                            <img
                              src={URL.createObjectURL(item.image)}
                              alt={item.name}
                              className='w-12 h-12 object-cover rounded-md mr-4'
                            />
                          )}
                          <span className='font-medium'>{item.name}</span>
                        </div>
                        <span>
                          {item.price
                            ? `${currencySymbol}${formatCurrencyWithComma(
                                item.price
                              )}`
                            : "No price set"}
                        </span>
                      </div>
                      {item.description && (
                        <p className='text-sm text-muted-foreground mt-2'>
                          {item.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-muted-foreground'>No items added yet.</p>
              )}
            </div>
          )}
          <div className='flex justify-between mt-5'>
            <span className='font-medium'>Total</span>
            <span className='text-muted-foreground'>
              {currencySymbol}
              {formatCurrencyWithComma(wishData.target)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
