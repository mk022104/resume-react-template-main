import {
  RESUME,
  RESUME_TEXT,
  buildResumeText,
  findExperienceByKeyword,
  findExperienceByLocation,
  findExperienceByYear,
  formatExperience,
  getPreviousProjects,
  isHomeLocationQuestion,
  listAllResumeLocations,
} from './resumeKnowledge';

describe('resume knowledge helpers', () => {
  test('builds searchable resume text from profile, skills, jobs, and education', () => {
    const text = buildResumeText();

    expect(text).toContain(`RESUME OF ${RESUME.fullName}`);
    expect(text).toContain('React.js, JavaScript (ES6+)');
    expect(text).toContain('Access Management & Authentication Platform');
    expect(text).toContain('Chicago State University');
    expect(RESUME_TEXT).toBe(text);
  });

  test('formats experience and allows limiting the highlights', () => {
    const pearson = RESUME.experience[0];

    expect(formatExperience(pearson)).toContain('Company: Pearson');
    expect(formatExperience(pearson, { highlightCount: 1 })).toContain(
      pearson.highlights[0]
    );
    expect(formatExperience(pearson, { highlightCount: 1 })).not.toContain(
      pearson.highlights[1]
    );
  });

  test('finds all jobs overlapping a year and ignores invalid or unmatched years', () => {
    expect(findExperienceByYear('2021').map((job) => job.company)).toEqual([
      'Cox Automotive',
      'State Farm',
    ]);
    expect(findExperienceByYear('not a year')).toEqual([]);
    expect(findExperienceByYear('2030')).toEqual([]);
  });

  test('matches experience by company, project keyword, or no keyword', () => {
    expect(
      findExperienceByKeyword('Tell me about the fleet project').company
    ).toBe('Cox Automotive');
    expect(findExperienceByKeyword('quantum experience')).toMatchObject({
      company: 'IBM',
    });
    expect(findExperienceByKeyword('a topic not on the resume')).toBeNull();
  });

  test('returns previous roles without the current role', () => {
    const previous = getPreviousProjects();

    expect(previous).toHaveLength(RESUME.experience.length - 1);
    expect(previous[0].company).toBe('Cox Automotive');
    expect(previous.some((job) => job.company === 'Pearson')).toBe(false);
  });

  test('matches work locations and returns an empty list for unknown locations', () => {
    expect(
      findExperienceByLocation('Durham, NC').map((job) => job.company)
    ).toEqual(['Pearson', 'Fidelity Investments']);
    expect(findExperienceByLocation('Paris, France')).toEqual([]);
  });

  test('recognizes home-location questions and rejects unrelated questions', () => {
    expect(isHomeLocationQuestion('Where does he live?')).toBe(true);
    expect(isHomeLocationQuestion('Cary, NC')).toBe(true);
    expect(isHomeLocationQuestion('What projects did he build?')).toBe(false);
  });

  test('lists home and work locations', () => {
    const locations = listAllResumeLocations();

    expect(locations).toContain('Home / current city: Cary, NC');
    expect(locations).toContain('Atlanta, GA — Cox Automotive');
    expect(locations).toContain(
      'Bangalore, India — Bench Tech Software Pvt Ltd'
    );
  });
});
