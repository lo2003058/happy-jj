// safePeriod.ts
import moment from 'moment';

export function calculateSafePeriodEvents(
    firstDayDates: string[],
    t: (key: string) => string
): {
    title: string;
    date: string;
    backgroundColor: string;
    borderColor: string;
}[] {
    // Define constants for titles and colors using the passed-in translation function.
    const safeColor = "#00c951";
    const dangerColor = "#fb2c36";
    const menstruationColor = "#62748e";
    const firstDayColor = "#fcc800"; // Yellow for the first day of menstruation
    const safeTitle = t('safe');
    const dangerTitle = t('danger');
    const menstruationTitle = t('menstruation');

    // Define cycle configuration
    const cycleLength = 26;
    const menstruationPeriodDays = 6;  // First 6 days are menstruation period (dayOffset 0-5)
    const dangerPeriodRange = [8, 13];   // Day offsets 8-13

    // If no dates provided, return empty array
    if (!firstDayDates || firstDayDates.length === 0) {
        return [];
    }

    const events: { title: string; date: string; backgroundColor: string; borderColor: string }[] = [];

    // Loop through each provided first-day date
    for (const firstDay of firstDayDates) {
        const startDate = moment(firstDay, 'YYYY-MM-DD', true);
        if (!startDate.isValid()) {
            console.warn(`Invalid date provided: ${firstDay}`);
            continue;
        }

        for (let dayOffset = 0; dayOffset < cycleLength; dayOffset++) {
            const currentDate = startDate.clone().add(dayOffset, 'days');
            const dateStr = currentDate.format('YYYY-MM-DD');

            if (dayOffset < menstruationPeriodDays) {
                // For the first day (dayOffset === 0), use yellow; other days use menstruation color.
                events.push({
                    title: menstruationTitle,
                    date: dateStr,
                    backgroundColor: dayOffset === 0 ? firstDayColor : menstruationColor,
                    borderColor: dayOffset === 0 ? firstDayColor : menstruationColor
                });
            } else if (dayOffset >= dangerPeriodRange[0] && dayOffset <= dangerPeriodRange[1]) {
                events.push({
                    title: dangerTitle,
                    date: dateStr,
                    backgroundColor: dangerColor,
                    borderColor: dangerColor
                });
            } else {
                events.push({
                    title: safeTitle,
                    date: dateStr,
                    backgroundColor: safeColor,
                    borderColor: safeColor
                });
            }
        }
    }

    events.sort((a, b) => a.date.localeCompare(b.date));
    return events;
}
