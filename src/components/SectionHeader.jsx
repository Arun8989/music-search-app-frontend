function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.3em] text-orange-300/80">{eyebrow}</p>
        ) : null}
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}

export default SectionHeader
