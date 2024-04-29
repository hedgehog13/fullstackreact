

using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    public class ActivitiesController : BaseApiController
    {


        [HttpGet]//api/activities 
        public async Task<IActionResult> GetActivities([FromQuery] ActivityParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]//api/activities/dfgdjfh
        public async Task<IActionResult> GetActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }



        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));

        }
        [Authorize(Policy = "IActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {

            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));

        }
        [Authorize(Policy = "IActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));

        }
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        { return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id })); }
    }
}