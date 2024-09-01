function Quote() {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-muted dark:bg-background">
        <div className="max-w-md space-y-4 p-6 md:p-12">
            <blockquote className="text-lg font-semibold leading-snug md:text-xl md:leading-normal text-foreground dark:text-primary-foreground">
            &ldquo;Success is not final, failure is not fatal: It is the courage to continue that counts.&rdquo;
          </blockquote>
          <div className="text-muted-foreground dark:text-primary">
            <span className="font-medium">- Winston Churchill</span>
          </div>
        </div>
      </div>
    )
}

export default Quote;
