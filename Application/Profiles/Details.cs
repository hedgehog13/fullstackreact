using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Profile>>
        {
            private readonly IMapper __mapper;
            private readonly DataContext __context;
            public Handler(DataContext _context, IMapper _mapper)
            {
                __context = _context;
                __mapper = _mapper;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await __context.Users
                .ProjectTo<Profile>(__mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Username == request.Username);

                if(user == null) return null;
                return Result<Profile>.Success(user);
            }
        }
    }
}