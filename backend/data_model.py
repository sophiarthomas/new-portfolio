from __future__ import annotations
from datetime import date
from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, HttpUrl
import json




# # ─── Shared primitives ────────────────────────────────────────────────────────
# # Using Python's date type instead of a raw string — Pydantic will validate
# # and coerce "2021-06-01" automatically. For year-month only values,
# # standardize to the first of the month (e.g. "2022-03" → date(2022, 3, 1)).

# class DateRange(BaseModel):
#     start: date
#     end: Optional[date] = None  # None = present / current

#     @model_validator(mode="after")
#     def end_after_start(self) -> DateRange:
#         if self.end is not None and self.end < self.start:
#             raise ValueError(f"end date {self.end} must be after start date {self.start}")
#         return self



# Define the Schema Model 
class Project(BaseModel): 
    id: int
    title: str
    description: str
    tech_stack: List[str]
    github_url: str
    visible: bool
    # dates: 
    # img/video: 

class Company(BaseModel):
    id: str
    name: str 
    url: Optional[HttpUrl] = None
    logo_slug: Optional[str] = None     # maps to /public/logos/{slug}.svg
    location: Optional[str] = None      # "San Francisco, CA" | "Remote"
    industry: Optional[str] = None      # "Fintech" | "Healthcare" etc.

# #  ─── Bullet / Achievement ─────────────────────────────────────────────────────

class Bullet(BaseModel):
    text: str
    tags: list[str] = []
    metric: Optional[str] = None        # "Reduced load time by 40%"
    highlight: bool = False

    # @field_validator("tags")
    # @classmethod
    # def tags_lowercase(cls, v: list[str]) -> list[str]:
    #     # Enforce consistent tag casing so "Leadership" and "leadership"
    #     # don't end up as separate tags when filtering
    #     return [tag.lower().strip() for tag in v]
    
#    ─── Experience ───────────────────────────────────────────────────────────────

class EmploymentType(str, Enum):
    FULL_TIME  = "full-time"
    PART_TIME  = "part-time"
    CONTRACT   = "contract"
    FREELANCE  = "freelance"
    INTERNSHIP = "internship"
    VOLUNTEER  = "volunteer"

class Experience(BaseModel):
    id: int
    company: Company                       # FK → Company
    title: str                              # "Senior Frontend Engineer"
    type: EmploymentType
    # dates: DateRange
    skill_ids: list[str] = []               # FK[] → Skill
    bullets: list[Bullet] = []

#    ─── Education ───────────────────────────────────────────────────────────────

class Education(BaseModel): 
    id: int
    school: str
    gpa: float
    degree: str
    major: str
    # graduation_date: DateRange
    relevant_coursework: list[str] = []

#     # Display controls
#     featured: bool = False
#     order: Optional[int] = None

#     # Optional enrichment
#     team_size: Optional[int] = None
#     reporting_to: Optional[str] = None      # "Engineering Manager" — role, not name
#     promotion_from: Optional[str] = None    # prior title if this was a promotion

#     @field_validator("skill_ids")
#     @classmethod
#     def skill_ids_lowercase(cls, v: list[str]) -> list[str]:
#         return [s.lower().strip() for s in v]

#     @property
#     def is_current(self) -> bool:
#         return self.dates.end is None


# # ─── Example data ─────────────────────────────────────────────────────────────

# companies: list[Company] = [
#     Company(
#         id="acme",
#         name="Acme Corp",
#         url="https://acme.com",
#         logo_slug="acme",
#         location="Remote",
#         industry="SaaS",
#     )
# ]

# experiences: list[Experience] = [
#     Experience(
#         id="acme-swe2",
#         company_id="acme",
#         title="Software Engineer II",
#         type=EmploymentType.FULL_TIME,
#         dates=(start=date(2022, 3, 1), end=None),
#         skill_ids=["typescript", "react", "postgres"],
#         featured=True,
#         bullets=[
#             Bullet(
#                 text="Rebuilt the onboarding flow, cutting drop-off rate significantly.",
#                 metric="42% drop-off reduction",
#                 tags=["product", "frontend"],
#                 highlight=True,
#             ),
#             Bullet(
#                 text="Led migration from REST to GraphQL across 3 internal services.",
#                 tags=["architecture", "leadership"],
#             ),
#         ],
#     ),
#     Experience(
#         id="acme-swe1",
#         company_id="acme",
#         title="Software Engineer I",
#         type=EmploymentType.FULL_TIME,
#         dates=DateRange(start=date(2020, 6, 1), end=date(2022, 3, 1)),
#         skill_ids=["typescript", "react"],
#         featured=False,
#         bullets=[
#             Bullet(
#                 text="Shipped initial design system component library used across 4 products.",
#                 tags=["frontend", "design-systems"],
#             ),
#         ],
#     ),
# ]


# # ─── Serialization ────────────────────────────────────────────────────────────
# # Pydantic v2 — serialize to dict or JSON cleanly.
# # model_dump() is the v2 replacement for .dict()

# if __name__ == "__main__":
#     for exp in experiences:
#         print(exp.model_dump_json(indent=2))



# Helper to read local data
def load_json(var:str) -> any: 
    with open(f"data/{var}.json", "r") as file: 
        return json.load(file)
