from __future__ import annotations

from datetime import date, time
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field, model_validator


class MetadataField(BaseModel):
    key: str = Field(min_length=1, max_length=80)
    value: Any = None
    label: Optional[str] = None
    source: Optional[str] = None


class EventTimeSlot(BaseModel):
    slot_code: str = Field(min_length=1, max_length=40)
    label: str = Field(min_length=1, max_length=80)
    start_time: time
    end_time: time
    metadata: Dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="after")
    def validate_slot_window(self) -> "EventTimeSlot":
        if self.end_time <= self.start_time:
            raise ValueError("end_time must be greater than start_time")
        return self


class EventFunctionPlan(BaseModel):
    function_name: str = Field(min_length=1, max_length=100)
    meal_type: Optional[Literal["breakfast", "lunch", "hi-tea", "dinner"]] = None
    time_slot_code: str = Field(min_length=1, max_length=40)
    menu_plan_id: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class EventDayPlan(BaseModel):
    day_number: int = Field(ge=1)
    event_date: date
    functions: List[EventFunctionPlan] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class ClientEventIntake(BaseModel):
    client_name: str = Field(min_length=1, max_length=120)
    event_name: Optional[str] = Field(default=None, max_length=200)
    occasion: str = Field(min_length=1, max_length=120)
    venue: Optional[str] = Field(default=None, max_length=180)
    min_guests: int = Field(ge=1)
    max_guests: Optional[int] = Field(default=None, ge=1)

    is_multi_day: bool = False
    start_date: date
    end_date: date

    time_slots: List[EventTimeSlot] = Field(default_factory=list)
    day_plans: List[EventDayPlan] = Field(default_factory=list)

    # Metadata-driven extension points for future intake fields.
    metadata_fields: List[MetadataField] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="after")
    def validate_event_shape(self) -> "ClientEventIntake":
        if self.end_date < self.start_date:
            raise ValueError("end_date must be on or after start_date")

        if self.max_guests is not None and self.max_guests < self.min_guests:
            raise ValueError("max_guests cannot be smaller than min_guests")

        if not self.day_plans:
            raise ValueError("day_plans must include at least one day")

        if not self.is_multi_day and len(self.day_plans) != 1:
            raise ValueError("single-day events must provide exactly one day plan")

        slot_codes = {slot.slot_code for slot in self.time_slots}
        day_dates = set()
        for day in self.day_plans:
            if day.event_date < self.start_date or day.event_date > self.end_date:
                raise ValueError("day_plans.event_date must fall within start_date and end_date")
            if day.event_date in day_dates:
                raise ValueError("duplicate day_plans.event_date is not allowed")
            day_dates.add(day.event_date)

            for fn in day.functions:
                if slot_codes and fn.time_slot_code not in slot_codes:
                    raise ValueError(f"time_slot_code '{fn.time_slot_code}' is not defined in time_slots")

        return self
